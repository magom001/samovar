import Joi from 'joi';

export interface Configuration {
  telegramBotToken: string;
}

const validationSchema = Joi.object<Configuration>({
  telegramBotToken: Joi.string().required(),
});

export default () => {
  const config: Configuration = {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  };

  const result = validationSchema.validate(config, { abortEarly: false });

  if (result.error) {
    throw result.error;
  }

  return config;
};
