FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npx turbo prune --scope=api && \
    yarn --cwd ./out install && \
    yarn --cwd ./out turbo run build --filter=api

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/out .
EXPOSE 5002
CMD ["yarn", "--cwd", "apps/api", "start:prod"]
