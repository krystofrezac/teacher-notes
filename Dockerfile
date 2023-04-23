# Install dependencies only when needed
FROM node:18.15.0-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json .npmrc ./
RUN npm i -g npm@8.19.1
RUN npm ci

# Rebuild the source code only when needed
FROM node:18.15.0 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm i -g npm@8.19.1
RUN npm run build

FROM node:18.15.0 AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/db/ ./db
COPY --from=builder /app/package.json .

RUN npm i -g npm@8.19.1
CMD ["npm", "run", "start:prod"]