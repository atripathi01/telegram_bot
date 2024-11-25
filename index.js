const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const { Telegraf } = require('telegraf');
const { botChat } = require('./controllers/botcontroller');

dotenv.config();

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);
const PORT = 8080;

// middleware
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('error', err));

bot.on(['message', 'callback_query'], botChat);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start the bot
bot.launch();
console.log('Telegram bot is running...');
