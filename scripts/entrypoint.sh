#!/bin/sh
set -e

# We start as root so we can fix the ownership of the persistent-volume
# mount point. Docker mounts named volumes as root:root by default, which
# would prevent the non-root `nextjs` user (UID 1001) from writing uploaded
# files into /app/public/uploads.

UPLOADS="${UPLOAD_DIR:-/app/public/uploads}"
mkdir -p "$UPLOADS"
chown -R 1001:1001 "$UPLOADS" || true   # best-effort; harmless if already correct

# Run migrations as the nextjs user (idempotent — tracked in drizzle.__drizzle_migrations).
echo "[entrypoint] running database migrations…"
su-exec 1001:1001 node /app/scripts/migrate-prod.cjs

# Drop privileges and exec the Next.js standalone server.
echo "[entrypoint] starting server on ${HOSTNAME:-0.0.0.0}:${PORT:-80}…"
exec su-exec 1001:1001 node /app/server.js
