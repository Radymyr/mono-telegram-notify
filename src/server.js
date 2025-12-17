"use strict";

import { app, bot } from "./initialized.js";

import { monobankRoute, baseUrl, telegramRoute } from "./initialized.js";
import { makeTelegramWebhook, makeMonobankWebhook } from "./setWebhooks.js";
import {
  checkWebhook,
  getFormatText,
  getAccInfo,
  safetySendMessage,
  sendToTelegram,
  showHtml,
  validateToken,
  getAccountStatement,
} from "./utils.js";

app.get("/", showHtml);

app.get("/makeTelegramWebhook", async (request, reply) => {
  await makeTelegramWebhook(baseUrl, telegramRoute);
  reply.status(200).send("success");
});

app.post(telegramRoute, async (request, reply) => {
  const message = request.body?.message;
  const chatId = message.chat.id;
  const tokenFromText = message.text.trim();
  await bot.handleUpdate(request.body);

  if (!validateToken(tokenFromText)) {
    reply.status(200).send("success");
    return;
  }

  try {
    const result = await makeMonobankWebhook(tokenFromText, baseUrl, chatId);

    const response = await getAccInfo(tokenFromText);

    const accountStatementText = getAccountStatement(response.accounts);

    await safetySendMessage(chatId, accountStatementText);

    const json = await result.json();
    reply.status(200).send(json);
  } catch (error) {
    console.error(error);
  }
});

app.get(`${monobankRoute}/:id`, checkWebhook);

app.post(`${monobankRoute}/:id`, sendToTelegram);

export default async function handler(request, reply) {
  try {
    await app.ready();
  } catch (error) {
    console.error(`smth went wrong during execute 'app.ready() ${error}`);
  }
  app.server.emit("request", request, reply);
}
