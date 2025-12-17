"use strict";

import { bot, monobankRoute } from "./initialized.js";

export const makeTelegramWebhook = async (url, route) => {
  await bot.telegram.setWebhook(url + route);
  const telegramWebhookInfo = await bot.telegram.getWebhookInfo();

  console.log("telegramWebhookInfo:", telegramWebhookInfo);
};

export const makeMonobankWebhook = async (token, webHook, id) => {
  const webHookUrl = webHook + monobankRoute + "/" + id;

  const webhookRegistrationUrl = "https://api.monobank.ua/personal/webhook";

  return await fetch(webhookRegistrationUrl, {
    method: "POST",
    headers: {
      "X-Token": token,
    },
    body: JSON.stringify({ webHookUrl }),
  });
};
