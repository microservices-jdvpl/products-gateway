import { BadRequestException } from '@nestjs/common';
import 'dotenv/config';
import * as joi from 'joi';

interface IEnvs {
  PORT: number;
  PRODUCTS_MICROSERVICES_HOST: string;
  PRODUCTS_MICROSERVICES_PORT: number;
  ORDERS_MICROSERVICES_HOST: string;
  ORDERS_MICROSERVICES_PORT: number;
}

const envsSchema = joi
  .object<IEnvs>({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
    ORDERS_MICROSERVICES_HOST: joi.string().required(),
    ORDERS_MICROSERVICES_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new BadRequestException(error.message);
}

const envVars: IEnvs = value;

export const envs = {
  PORT: envVars.PORT,
  PRODUCTS_MICROSERVICES_HOST: envVars.PRODUCTS_MICROSERVICES_HOST,
  PRODUCTS_MICROSERVICES_PORT: envVars.PRODUCTS_MICROSERVICES_PORT,
  ORDERS_MICROSERVICES_HOST: envVars.ORDERS_MICROSERVICES_HOST,
  ORDERS_MICROSERVICES_PORT: envVars.ORDERS_MICROSERVICES_PORT,
};
