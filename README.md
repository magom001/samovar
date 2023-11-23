# Project Samovar

_TODO: project description_

- [Project Samovar](#project-samovar)
  - [Local setup](#local-setup)
    - [Prerequisites](#prerequisites)
    - [Setting up Telegram Bot and Mini App](#setting-up-telegram-bot-and-mini-app)
    - [Local development](#local-development)
      - [1. Checkout the repository](#1-checkout-the-repository)
      - [2. Setup local database](#2-setup-local-database)
      - [3. Frontend \& API](#3-frontend--api)
      - [4. Telegram Bot development](#4-telegram-bot-development)
    - [Testing API](#testing-api)

## Local setup

### Prerequisites

Make sure you have:

- NodeJS 18. It is recommended to use [nvm](https://github.com/nvm-sh/nvm) to manage local NodeJS installations.
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [Docker](https://docs.docker.com/engine/install/)
- [ngrok](https://ngrok.com/download)
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Setting up Telegram Bot and Mini App

You must have a Telegram account to be able to run the steps below.

1. Follow the steps from the official Telegram Bot [tutorial](https://core.telegram.org/bots/tutorial)
2. Create a bot, name is arbitrary.
3. By this step you should already be familiar with the [@BotFather](https://t.me/botfather).
4. Run `/newapp` command in the BotFather's chat.
5. Follow through the steps to get yourself a Mini App.

### Local development

#### 1. Checkout the repository

```bash
git checkout https://github.com/magom001/samovar.git
```

From within the downloaded directory:

```bash
yarn install
```

Search for `.env.sample` files, copy and rename them to `.env`. Fill in the required environment variables.

#### 2. Setup local database

From the root of the project run

```bash
docker compose up
```

The database's data will be persisted in the `.data` folder. All `*.sql` scripts in the
[migrations](./apps/api/migrations/) folder will run on first instantiation.

> [!NOTE]  
> If you want to reset your local database, simply delete the `.data` folder and rerun
> docker compose.

#### 3. Frontend & API

1. To start developing Mini App frontend and API locally, run in parallel:

   ```bash
   yarn --cwd apps/mini-app start
   ```

   and

   ```bash
   yarn --cwd apps/api start:dev
   ```

1. In another terminal, start ngrok:

   ```bash
   ngrok http 3000
   ```

   Copy the generated `https://***.ngrok.app` URL.

1. In @BotFather chat run the following command:

   ```
   /myapps
   ```

   Choose the Mini App that you had previously created.

1. Click `Edit Web App URL` and paste the ngrok URL.

After completing these steps, if you open the Mini App link in Telegram, the request will be proxied to the dev server running on your machine.

> [!WARNING]  
> Make sure that `REACT_APP_API_URL` is not set in the `mini-app` [.env](./apps/mini-app/.env) file. If it is, all API requests will be sent to that address.

#### 4. Telegram Bot development

1. Copy the Telegram Bot token of your dev bot to the [.env](./apps/telegram-bot/.env) file and save it under `TELEGRAM_BOT_TOKEN`.
1. Run the `telegram-bot` project in development mode.

   ```bash
   yarn --cwd apps/telegram-bot dev
   ```

1. Start a chat with your bot in Telegram.

### Testing API

We use [Insomnia](https://insomnia.rest/download) to test the API. The workspace can be imported from the [yarn file](.insomnia/samovar.yaml).
Alternatively, contact the project administrators to add you to the workspace.
