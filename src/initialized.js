import "dotenv/config";
import Fastify from "fastify";
import { Telegraf } from "telegraf";

export const monobankToken = process.env.MONOBANK_TOKEN;
export const baseUrl = process.env.WEB_HOOK_URL;
export const telegramToken = process.env.TELEGRAM_TOKEN;
export const telegramUrl = `https://api.telegram.org/bot${telegramToken}/setWebhook`;

export const bot = new Telegraf(telegramToken);
export const app = Fastify({ logger: true });

export const monobankRoute = "/monobank/webhook";
export const telegramRoute = "/telegram/webhook";

export const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>mono-telegram-notify</title>
    <link
      rel="icon"
      type="image/x-icon"
    />
  </head>
  <body>
    <h1>mono-telegram-notify</h1>
  </body>
</html>`;
