# Multi-stage Dockerfile for NestJS + Prisma (sqlite)

# 1) Base image with pnpm and system deps
FROM node:20-alpine AS base
ENV PNPM_HOME=/root/.local/share/pnpm \
    PATH=/root/.local/share/pnpm:$PATH
RUN corepack enable && apk add --no-cache openssl libc6-compat
WORKDIR /app

# 2) Development image
FROM base AS development
# Copy only package manager manifests for better cache usage
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
# Prisma: copy schema and generate client
COPY prisma ./prisma
RUN pnpm prisma generate
# Create data dir for sqlite database
RUN mkdir -p /app/data
# Copy source code
COPY tsconfig*.json nest-cli.json ./
COPY src ./src
# Expose API port
EXPOSE 3333
# Default envs for dev (can be overridden by compose)
ENV NODE_ENV=development \
    PORT=3333
# Start command can be overridden by compose to run migrations first
CMD ["pnpm", "run", "start:dev"]

# 3) Builder for production (compile TS)
FROM base AS builder
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY prisma ./prisma
RUN pnpm prisma generate
COPY tsconfig*.json nest-cli.json ./
COPY src ./src
RUN pnpm run build

# 4) Production runtime
FROM base AS production
ENV NODE_ENV=production \
    PORT=3333
# Only install prod deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod
# Copy compiled app and necessary assets
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
# Generate Prisma client in production stage
RUN pnpm prisma generate
# Data directory for sqlite database file that will be stored in a volume
RUN mkdir -p /app/data
# Expose API port
EXPOSE 3333
CMD ["node", "dist/main.js"]