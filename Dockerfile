FROM node:lts
# Set the working directory
WORKDIR /app

# Copy package.json/pnpm-lock.yaml first to leverage Docker layer caching
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Enable pnpm via corepack (available in Node LTS images)
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

# set the env comming from the docker-compose file
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install dependencies
RUN pnpm install --frozen-lockfile
RUN pnpm install --filter @nest/cli --global

# Copy the rest of the application code
COPY tsconfig*.json nest-cli.json ./
COPY src ./src
COPY prisma ./prisma

# Set database URL for Prisma (SQLite) during build so migrations can run
ENV DATABASE_URL=file:./prisma/dev.db

# Run the migration
RUN pnpm prisma migrate deploy
RUN pnpm prisma generate
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3333

# Start the application
CMD ["node", "dist/main.js"]

# Healthcheck to ensure the app is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD curl -f http://localhost:3333/health || exit 1