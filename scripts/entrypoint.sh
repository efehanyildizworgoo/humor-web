#!/bin/sh
set -e

# Ensure persistent upload directory exists (volume may be mounted at /app/public/uploads).
mkdir -p "${UPLOAD_DIR:-/app/public/uploads}"

# Run migrations on every boot — idempotent (tracked via drizzle.__drizzle_migrations).
echo "[entrypoint] running database migrations…"
node /app/scripts/migrate-prod.cjs

# Start the Next.js standalone server.
echo "[entrypoint] starting server on ${HOSTNAME:-0.0.0.0}:${PORT:-80}…"
exec node /app/server.js
