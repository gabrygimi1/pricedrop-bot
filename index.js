import TelegramBot from "node-telegram-bot-api";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// === SERVER EXPRESS PER LA WEBAPP ===
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server attivo su porta ${PORT}`));

// === BOT TELEGRAM ===
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Apri il catalogo 👇\nOpen the catalog 👇", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🛍️ Apri Catalogo",
            web_app: {
              url: "https://pricedrop-bot-rhio.onrender.com"
            }
          }
        ]
      ]
    }
  });
});
