const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const ADMIN_ID = 5655858756;  // <-- tuo ID
const WEBAPP_URL = "https://pricedrop-one.onrender.com";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.from.username || "Nessuno username";
    const firstname = msg.from.first_name || "";
    const lastname = msg.from.last_name || "";
    const date = new Date().toISOString();

    // URL personalizzato
    const url = `${WEBAPP_URL}?u=${userId}`;

    // 🔥 INVIA A TE (ADMIN) il log dell’utente
    if (chatId !== ADMIN_ID) {
        bot.sendMessage(
            ADMIN_ID,
            `🔔 NUOVO UTENTE\n\n` +
            `👤 Nome: ${firstname} ${lastname}\n` +
            `🔗 Username: @${username}\n` +
            `🆔 ID: ${userId}\n` +
            `⏱ Data: ${date}`
        );
    }

    // Messaggio all’utente
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
