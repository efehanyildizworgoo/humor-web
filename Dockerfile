# syntax=docker/dockerfile:1.6
# ==========================
# 1) deps — node_modules install
# ==========================
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ==========================
# 2) builder — Next.js build
# ==========================
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

# ==========================
# 3) runner — minimal production image
# ==========================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=80
ENV HOSTNAME=0.0.0.0
ENV UPLOAD_DIR=/app/public/uploads

# Non-root user + su-exec (lets entrypoint drop from root → nextjs after
# fixing volume mount ownership at runtime).
RUN apk add --no-cache su-exec && \
    addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Standalone Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Migration assets (run on every boot via entrypoint)
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=builder --chown=nextjs:nodejs /app/scripts/migrate-prod.cjs ./scripts/migrate-prod.cjs
COPY --from=builder --chown=nextjs:nodejs /app/scripts/entrypoint.sh ./scripts/entrypoint.sh

# `pg` is bundled into .next/standalone/node_modules by Next.js (server code uses it
# and outputFileTracingIncludes forces inclusion). migrate-prod.cjs can `require("pg")`
# at runtime by resolving through the standalone node_modules.

RUN chmod +x ./scripts/entrypoint.sh && \
    mkdir -p ./public/uploads && \
    chown -R nextjs:nodejs ./public/uploads

# NOTE: run as root so entrypoint can chown the persistent-volume mount
# point (which Docker mounts as root:root regardless of the in-image
# ownership). Entrypoint drops to nextjs via su-exec before exec'ing node.
EXPOSE 80

CMD ["./scripts/entrypoint.sh"]
