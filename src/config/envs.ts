import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRATION: number;
  JWT_REFRESH_EXPIRATION: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    JWT_ACCESS_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    JWT_ACCESS_EXPIRATION: joi.number().required(),
    JWT_REFRESH_EXPIRATION: joi.number().required(),
  })
  .unknown(true);

const { error, value: env } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = env;

export const envs = {
  port: envVars.PORT,
  natServers: envVars.NATS_SERVERS,
  jwtAccessSecret: envVars.JWT_ACCESS_SECRET,
  jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
  jwtAccessExp: envVars.JWT_ACCESS_EXPIRATION,
  jwtRefreshExp: envVars.JWT_REFRESH_EXPIRATION,
};
