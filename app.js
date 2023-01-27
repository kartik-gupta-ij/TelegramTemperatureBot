// const TelegramBot = require('node-telegram-bot-api');
const { Bot } = require("grammy");
const request = require('request');
const dotenv = require('dotenv');
const mongodb = require('mongodb');
const express = require('express');
dotenv.config();

const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${process.env.WEATHER_API_KEY}&units=metric`
const mongodbUrl = process.env.MONGO_URL;
const telegramBotToken = process.env.BOT_TOKEN

mongodb.MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  const db = client.db('telegram-bot');
  const subscribers = db.collection('subscribers');


  const bot = new Bot(telegramBotToken, { polling: true });


  bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
  // Handle other messages.
  bot.on("message", (ctx) => ctx.reply("Got another message!"));
  
  // Now that you specified how to handle messages, you can start your bot.
  // This will connect to the Telegram servers and wait for messages.
  
  // Start the bot.
  bot.start();

  const app = express();
  app.get('/subscribers', (req, res) => {
    subscribers.find({}).toArray((err, subscribers) => {
      if (err) throw err;
      res.json(subscribers);
    });
  });
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

});
