const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
// Replace 'YOUR_TOKEN' with your bot's API token
const TOKEN = process.env.BOT_TOKEN;

// Create a new bot instance
const bot = new TelegramBot(TOKEN, { polling: true });

// Command handler for /start command
bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(
		chatId,
		"Hello! I'm your echo bot. Send me a message and I'll echo it back."
	);
});

// Message handler
bot.on("message", (msg) => {
	const chatId = msg.chat.id;

	// Check if the received message is a text message
	if (msg.text) {
		bot.sendMessage(chatId, msg.text);
	}
});

console.log("Bot is running...");
