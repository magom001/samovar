FROM node:18-alpine
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
WORKDIR /app
COPY . .
RUN npx turbo prune --scope=mini-app && \
    yarn --cwd ./out install && \
    yarn --cwd ./out turbo run build --filter=mini-app