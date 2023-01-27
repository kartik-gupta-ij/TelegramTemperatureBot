const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const dotenv = require('dotenv');
const mongodb = require('mongodb');
const express = require('express');
dotenv.config();

const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${process.env.WEATHER_API_KEY}&units=metric`
const mongodbUrl = process.env.MONGO_URL;
const telegramBotToken = process.env.BOT_TOKEN
const URI = `/webhook/${telegramBotToken}`

mongodb.MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  const db = client.db('telegram-bot');
  const subscribers = db.collection('subscribers');


  const bot = new TelegramBot(telegramBotToken, { polling: true });


  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Welcome to my Telegram bot!
Use the /subscribe command to subscribe to temperature updates.
Use the /unsubscribe command to unsubscribe.
Use the /currenttemp command to check the current temperature in Delhi.
Use the /subscribers command to see the list of subscribed users.
    `);
  });


  bot.onText(/\/subscribe/, (msg) => {
    subscribers.findOne({ chatId: msg.chat.id }, (err, subscriber) => {
      if (err) throw err;
      if (subscriber === null) {
        subscribers.insertOne({
          chatId: msg.chat.id,
          firstName: msg.chat.first_name,
          lastName: msg.chat.last_name,
          username: msg.chat.username
        }, (err) => {
          if (err) throw err;
          bot.sendMessage(msg.chat.id, 'You have been subscribed to temperature updates.');
        });
      } else {
        bot.sendMessage(msg.chat.id, 'You are already subscribed to temperature updates.');
      }
    });
  });


  bot.onText(/\/unsubscribe/, (msg) => {
    subscribers.deleteOne({ chatId: msg.chat.id }, (err) => {
      if (err) throw err;
      bot.sendMessage(msg.chat.id, 'You have been unsubscribed from temperature updates.');
    });
  });

  bot.onText(/\/currenttemp/, (msg) => {
    request(weatherUrl, (err, res, body) => {
      if (err) throw err;
      const weather = JSON.parse(body);
      const temperature = weather.main.temp;
      bot.sendMessage(msg.chat.id, `The current temperature in Delhi is ${temperature}°C.`);
    });
  });


  bot.onText(/\/subscribers/, (msg) => {
    subscribers.find({}).toArray((err, subscribers) => {
      if (err) throw err;
      if (subscribers.length === 0) {
        bot.sendMessage(msg.chat.id, 'There are no subscribers.');
      } else {
        let subscribersList = 'List of subscribers:\n';
        subscribers.forEach((subscriber) => {
          subscribersList += `- ${subscriber.firstName} ${subscriber.lastName} (@${subscriber.username}) \n`;
        });
        bot.sendMessage(msg.chat.id, subscribersList);
      }
    });
  });
  function getTemperature() {
    request(weatherUrl, function (err, res, body) {
      if (!err && res.statusCode === 200) {
        const weather = JSON.parse(body);
        const temperature = weather.main.temp;
        const message = `The current temperature in Delhi is${temperature}°C.`;
        subscribers.find({}).toArray((err, docs) => {
          if (err) throw err;
          docs.forEach((subscriber) => {
            bot.sendMessage(subscriber.chatId, message);
          });
        });
      }
    });
  }
  setInterval(getTemperature, 3600000);
});
