// Production migration runner — applies all .sql files in ./drizzle/ in order.
// Tracks applied migrations in __drizzle_migrations table. Idempotent.
// Designed to run inside the Next.js standalone image before `node server.js`.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

async function main() {
  const { Pool } = require("pg");

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("[migrate] DATABASE_URL not set — skipping migrations.");
    process.exit(1);
  }

  const migrationsDir = path.resolve(__dirname, "..", "drizzle");
  if (!fs.existsSync(migrationsDir)) {
    console.log("[migrate] No drizzle/ directory found — nothing to do.");
    return;
  }

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql") && !f.startsWith("."))
    .sort();
  if (files.length === 0) {
    console.log("[migrate] No .sql migration files — nothing to do.");
    return;
  }

  const pool = new Pool({ connectionString: url });
  const client = await pool.connect();
  try {
    await client.query(
      `CREATE SCHEMA IF NOT EXISTS drizzle;
       CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (
         id serial PRIMARY KEY,
         hash text NOT NULL UNIQUE,
         created_at bigint NOT NULL
       );`,
    );

    const { rows } = await client.query(
      `SELECT hash FROM drizzle.__drizzle_migrations`,
    );
    const applied = new Set(rows.map((r) => r.hash));

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      const hash = crypto.createHash("sha256").update(sql).digest("hex");
      if (applied.has(hash)) {
        console.log(`[migrate] skip ${file} (already applied)`);
        continue;
      }
      console.log(`[migrate] apply ${file}`);
      await client.query("BEGIN");
      try {
        // Drizzle generates statements separated by `--> statement-breakpoint`.
        const stmts = sql
          .split(/-->\s*statement-breakpoint/g)
          .map((s) => s.trim())
          .filter(Boolean);
        for (const stmt of stmts) {
          await client.query(stmt);
        }
        await client.query(
          `INSERT INTO drizzle.__drizzle_migrations (hash, created_at) VALUES ($1, $2)`,
          [hash, Date.now()],
        );
        await client.query("COMMIT");
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      }
    }

    console.log("[migrate] done");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("[migrate] failed:", err.message || err);
  process.exit(1);
});
