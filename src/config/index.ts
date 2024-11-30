import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });

// DECLARE ALL VARIABLES
const APP_VERSION = process.env.APP_VERSION || "1.0";
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const LOG_LEVEL = process.env.LOG_LEVEL || "trace";
const LOG_PAYLOAD = process.env.LOG_PAYLOAD || "false";

export type Config = {
  APP_VERSION: string;
  NODE_ENV: string;
  PORT: number;
  LOG_LEVEL?: string;
  LOG_PAYLOAD?: string;
};

export function getConfig(): Config {
  //CREATE CONFIG OBJECT
  const config: Config = {
    APP_VERSION: APP_VERSION,
    NODE_ENV: NODE_ENV,
    PORT: PORT,
    LOG_LEVEL: LOG_LEVEL,
    LOG_PAYLOAD: LOG_PAYLOAD
  };

  return config;
}
