import dotenv from "dotenv";
import * as fs from "fs";
import { resolve } from "path";

const envPath = resolve(__dirname, "../../.env");

const envConfig = dotenv.parse(fs.readFileSync(envPath));

Object.entries(envConfig).forEach(([key, value]) => {
  process.env[key] = value;
});

interface EnvConfig {
  TWITCH_BOT_USERNAME: string;
  TWITCH_BOT_APP_CLIENT_ID: string;
  TWITCH_BOT_APP_CLIENT_SECRET: string;
  TWITCH_BOT_ACCESS_TOKEN: string;
  TWITCH_BOT_CLIENT_ID: string;
  TWITCH_BOT_REFRESH_TOKEN: string;
  TWITCH_CHANNEL_NAME: string;
  WEATHER_API_KEY: string;
  PORT: number;
}

function getEnvVariable(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || "";
}

export const config: EnvConfig = {
  TWITCH_BOT_USERNAME: getEnvVariable("TWITCH_BOT_USERNAME"),
  TWITCH_BOT_APP_CLIENT_ID: getEnvVariable("TWITCH_BOT_APP_CLIENT_ID"),
  TWITCH_BOT_APP_CLIENT_SECRET: getEnvVariable("TWITCH_BOT_APP_CLIENT_SECRET"),
  TWITCH_BOT_ACCESS_TOKEN: getEnvVariable("TWITCH_BOT_ACCESS_TOKEN"),
  TWITCH_BOT_CLIENT_ID: getEnvVariable("TWITCH_BOT_CLIENT_ID"),
  TWITCH_BOT_REFRESH_TOKEN: getEnvVariable("TWITCH_BOT_REFRESH_TOKEN"),
  TWITCH_CHANNEL_NAME: getEnvVariable("TWITCH_CHANNEL_NAME"),
  WEATHER_API_KEY: getEnvVariable("WEATHER_API_KEY"),
  PORT: Number(getEnvVariable("PORT", false)) || 3000,
};
