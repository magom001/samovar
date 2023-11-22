# Project Samovar

*TODO: project description*

- [Project Samovar](#project-samovar)
  - [Local setup](#local-setup)
    - [Prerequisites](#prerequisites)
    - [Setting up Telegram Bot and Mini App](#setting-up-telegram-bot-and-mini-app)
    - [Local development](#local-development)
      - [Frontend \& API](#frontend--api)
      - [Telegram Bot development](#telegram-bot-development)
    - [Testing API](#testing-api)


## Local setup

### Prerequisites

Make sure you have 
- Node 18. It is recommended to use [NVM](https://github.com/nvm-sh/nvm) to manage local Node installations.
- [YARN](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed.
- [Docker](https://docs.docker.com/engine/install/).
- [Ngrok](https://ngrok.com/download)
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Setting up Telegram Bot and Mini App

You must have a Telegram account to be able to run the steps below.

1. Follow the steps from the official Telegram Bot [tutorial](https://core.telegram.org/bots/tutorial)
2. Create a bot, name is arbitrary.
3. By this step you should already be familiar with the [@BotFather](https://t.me/botfather).
4. Run `/newapp` command in the BotFather's chat.
5. Follow through the steps to get yourself a Mini App.

### Local development

Checkout the repository:
```bash
git checkout https://github.com/magom001/samovar.git
```

From within the downloaded directory:
```bash
yarn install
```

**TODO: SETUP LOCAL POSTGRES STEPS**

Search for `.env.sample` files, copy and rename them to `.env`. Fill in the required environment variables.

#### Frontend & API

To start developing frontend and API locally, run in parallel:

```bash
yarn --cwd apps/mini-app start
```

and

```bash
yarn --cwd apps/api start:dev
```

In another terminal, start ngrok:

```bash
ngrok http 3000
```

Copy the generated `https://***.ngrok.app` URL.

In @BotFather chat run:

```
/myapps
```

Choose the Mini App that you have created previously.

Click `Edit Web App URL` and paste the ngrok URL.

After that, if you open the Mini App link in Telegram, the request will be proxied to the dev server running on your machine.

> [!WARNING]  
> Make sure that `REACT_APP_API_URL` is not set in the `mini-app` [.env](./apps/mini-app/.env) file. If it is set, all API requests will be sent to that address.

#### Telegram Bot development

Simply copy the Telegram Bot token of your dev bot to the [.env](./apps/telegram-bot/.env) file and save it under `TELEGRAM_BOT_TOKEN`. Run the `telegram-bot` project. Start a chat with your bot in Telegram.

### Testing API

We use [Insomnia](https://insomnia.rest/download) to test the API. The workspace can be imported from the [yarm file](./.insomnia/samovar.yaml). Alternatively, contact the project administrators to add you to the workspace.
