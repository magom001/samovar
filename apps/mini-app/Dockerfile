FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npx turbo prune --scope=mini-app && \
    yarn --cwd ./out install && \
    yarn --cwd ./out turbo run build --filter=mini-api