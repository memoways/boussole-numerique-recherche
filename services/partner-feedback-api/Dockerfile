# syntax=docker/dockerfile:1
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches
COPY services/partner-feedback-api/package.json ./services/partner-feedback-api/package.json
RUN pnpm install --frozen-lockfile
COPY services/partner-feedback-api ./services/partner-feedback-api
RUN pnpm --filter @boussole/partner-feedback-api build \
  && pnpm --filter @boussole/partner-feedback-api --prod deploy --legacy /runtime

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /runtime ./
COPY --from=build /app/services/partner-feedback-api/src/schema.sql ./dist/schema.sql
EXPOSE 3001
CMD ["node", "dist/index.cjs"]
