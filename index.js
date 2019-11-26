const dotenv = require('dotenv');
dotenv.config();

const DiscordClient = require('./remindapp');

// Controllers and middle-wares
const fireEvents = require('./controllers/middlewares/fireevents');
const setReminder = require('./controllers/setReminder');

// Model layer
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
mongoose.set('useFindAndModify', false);

const continouslySendMessages = require('./services/messagesender');

const TOKEN = process.env.DISCORD_TOKEN;

client = new DiscordClient();

(async () => {
    await mongoose.connect(mongoURI,{useUnifiedTopology:true,useNewUrlParser:true});
    console.log("Connected to database");

    client.on("message",fireEvents);

    client.on("setReminder",setReminder);

    await client.login(TOKEN);
    console.log(`Logged in as ${client.user.tag}`);

    continouslySendMessages();


})();