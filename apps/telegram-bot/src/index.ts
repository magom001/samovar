import { I18n, I18nFlavor } from '@grammyjs/i18n';
import dotenv from 'dotenv';
import { Bot, Context, GrammyError, HttpError, InlineKeyboard } from 'grammy';

dotenv.config();

const { TELEGRAM_BOT_TOKEN, MINI_APP_URI } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is required');
}

if (!MINI_APP_URI) {
  throw new Error('MINI_APP_URI is required');
}

console.log('Initiating bot...');

type BotContext = Context & I18nFlavor;

const bot = new Bot<BotContext>(TELEGRAM_BOT_TOKEN);

/**
 * MIDDLEWARES
 */
// Create an `I18n` instance.
// Continue reading to find out how to configure the instance.
const i18n = new I18n<BotContext>({
  defaultLocale: 'en', // see below for more information
  directory: 'locales', // Load all translation files from locales/.
});

// Finally, register the i18n instance in the bot,
// so the messages get translated on their way!
bot.use(i18n);

/**
 * COMMANDS
 */
bot.command('start', async (context) => {
  console.log('Start command', context.chat.id, JSON.stringify(context.from));
  await context.reply(context.t('start'));
  await bot.api.setMyCommands(
    [
      {
        command: 'start',
        description: context.t('command-start'),
      },
      {
        command: 'help',
        description: context.t('command-help'),
      },
    ],
    {
      scope: {
        type: 'chat',
        chat_id: context.chat.id,
      },
    }
  );
});

bot.command('help', async (context) => {
  const keyboard = new InlineKeyboard().webApp(context.t('mini-app'), MINI_APP_URI);

  await context.reply(context.t('help'), {
    reply_markup: keyboard,
  });
});

/**
 * CATCH ALL
 */
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
});

bot.start({
  onStart: (context) => {
    console.log('Bot started!');
  },
});
