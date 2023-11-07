import Joi from 'joi';

export interface Configuration {
  telegramBotToken: string;
  databaseConnectionString: string;
}

const validationSchema = Joi.object<Configuration>({
  telegramBotToken: Joi.string().required(),
  databaseConnectionString: Joi.string().required(),
});

export default () => {
  const config: Configuration = {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    databaseConnectionString: process.env.DATABASE_URL,
  };

  const result = validationSchema.validate(config, { abortEarly: false });

  if (result.error) {
    throw result.error;
  }

  return config;
};
