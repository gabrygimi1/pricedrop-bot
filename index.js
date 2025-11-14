const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const WEBAPP_URL = "https://pricedrop-one.onrender.com";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    const url = `${WEBAPP_URL}?u=${userId}`;

    await bot.sendMessage(chatId,
        "Apri il catalogo 👇\nOpen the catalog 👇",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📦 Apri Catalogo", web_app: { url: url } }]
                ]
            }
        }
    );
});

console.log("Bot avviato!");