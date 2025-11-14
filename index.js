import express from "express";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

app.use(express.json());

bot.start((ctx) => {
  return ctx.reply(
    "Benvenuto! 👕\nApri il nostro catalogo:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📱 Apri Catalogo",
              web_app: {
                url: process.env.WEBAPP_URL
              }
            }
          ]
        ]
      }
    }
  );
});

app.post(`/webhook/${process.env.BOT_TOKEN}`, (req, res) => {
  bot.handleUpdate(req.body);
  res.status(200).send("ok");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Bot avviato su Render!");
});
