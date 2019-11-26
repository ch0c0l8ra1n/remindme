const parser = require('../services/parser');
const Reminder = require('../models/reminder');

const setReminder = async (msg) => {
    const options = parser(msg);
    if (options.error){
        await msg.reply(options.message);
        return null;
    }
    else{
        delete options.error;
        await msg.reply(`Reminder has been set for \`${options.reminderDate}\``);
        await Reminder.create(options);
    }
    return msg;
};

module.exports = setReminder;