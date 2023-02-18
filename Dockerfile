FROM registry.vnfco.ir/library/node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production --no-package-lock


FROM registry.vnfco.ir/library/node:14-alpine AS builder
WORKDIR /app
ARG NODE_ENV=production
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build


FROM registry.vnfco.ir/library/node:14-alpine AS runner
WORKDIR /app
ARG NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./.env.production
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000
ENV PORT 3000
CMD ["node_modules/.bin/next", "start"]