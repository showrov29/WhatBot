const TelegramBot = require("node-telegram-bot-api");
const { fetchContest } = require("./helper/codeForce");
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
bot.on("message", async (msg) => {
	const chatId = msg.chat.id;
	let data = await fetchContest();
	// console.log("🚀 ~ file: server.js:23 ~ bot.on ~ data:", data);
	// Check if the received message is a text message
	if (msg.text) {
		bot.sendMessage(chatId, msg.text);
	}
});

console.log("Bot is running...");
