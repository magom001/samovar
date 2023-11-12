FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npx turbo prune --scope=telegram-bot && \
    yarn --cwd ./out install && \
    yarn --cwd ./out turbo run build --filter=telegram-bot

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/out .
CMD ["yarn", "--cwd", "apps/telegram-bot", "start:prod"]
