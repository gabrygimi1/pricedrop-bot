import os
from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor

# 🔐 Legge le variabili da Render (le imposteremo dopo)
BOT_TOKEN = os.getenv("BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://tuodominio.it/index.html")  # CAMBIA qui se vuoi

if not BOT_TOKEN:
    raise RuntimeError("BOT_TOKEN non impostato! Mettilo nelle Environment Variables su Render.")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    lang = message.from_user.language_code or "en"
    is_italian = lang.startswith("it")

    if is_italian:
        text = (
            "👋 *Benvenuto nel catalogo PriceDrop!*\n\n"
            "Clicca qui sotto per aprire la WebApp e sfogliare il catalogo."
        )
        button_text = "📦 Apri catalogo"
    else:
        text = (
            "👋 *Welcome to the PriceDrop catalog!*\n\n"
            "Tap below to open the WebApp and browse the catalog."
        )
        button_text = "📦 Open catalog"

    keyboard = types.InlineKeyboardMarkup()
    keyboard.add(
        types.InlineKeyboardButton(
            text=button_text,
            web_app=types.WebAppInfo(url=WEBAPP_URL)
        )
    )

    await message.answer(text, parse_mode="Markdown", reply_markup=keyboard)

if __name__ == "__main__":
    print("Bot in esecuzione...")
    executor.start_polling(dp, skip_updates=True)
