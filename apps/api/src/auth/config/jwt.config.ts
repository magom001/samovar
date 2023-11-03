import Joi from 'joi';
import { registerAs } from '@nestjs/config';

const schema = Joi.object({
  secret: Joi.string().required(),
  audience: Joi.string().required(),
  issuer: Joi.string().required(),
  accessTokenTtl: Joi.number().required(),
});

export default registerAs('jwt', () => {
  const config = {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TLL || '3600', 10),
  };

  const result = schema.validate(config, { abortEarly: true });

  if (result.error) {
    throw new Error(`JWT config validation error: ${result.error.message}`);
  }

  return config;
});
