# Telegram Temperature Bot

This is a Telegram bot built with Node.js that allows users to subscribe to receive temperature updates of a specific location, unsubscribe from the updates, and check the current temperature.

## Prerequisites
- Node.js and npm
- A Telegram bot token
- MongoDB Atlas account and cluster
- .env file containing the following variables:
  - `TELEGRAM_TOKEN`: Telegram bot token
  - `MONGO_URL`: MongoDB Atlas connection URL
  - `LOCATION`: The location for which temperature updates are sent (e.g. "Delhi")

## Running the bot
1. Install the dependencies by running `npm install` in the project directory
2. Start the bot by running `npm start`
3. The bot should now be running and ready to receive commands

## Available commands
- `/start`: Provides a brief description of the bot and its commands
- `/subscribe`: Subscribes the user to receive temperature updates
- `/unsubscribe`: Unsubscribes the user from receiving temperature updates
- `/current-temp`: Sends the current temperature of the specified location to the user
- `/subscribers`: Returns the list of subscribed users and their information
<!-- - `/temp-update`: Send the temperature updates to all subscribers after every hour -->

## Deployment
- Deploy the bot on any hosting platform like Heroku, AWS, etc.
- Use cron job or setInterval to send the temperature updates after every hour to the subscribers.

## API
- `/subscribers` : Returns the list of subscribed users and their information in json format.

## Built With
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - Telegram Bot API for Node.js
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud-based MongoDB service
- [Express](https://expressjs.com/) - Web framework for Node.js
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a .env file
- [mongodb](https://www.npmjs.com/package/mongodb) - MongoDB driver for Node.js

## Author
- [Kartik Gupta](https://github.com/kartik-gupta-ij)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [node-telegram-bot-api documentation](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md)
- [MongoDB Atlas documentation](https://docs.atlas.mongodb.com/)
- [Express.js documentation](https://expressjs.com/en/4x/api.html)

This is a basic example to give you an idea of how to create a Telegram bot using Node.js that allows users to subscribe to temperature updates, unsubscribe from the updates, and check the current temperature. You can also use this code as a starting point for your own bot and add more functionalities as per your requirement.
