const Reminder = require('../models/reminder');

const sendMessages = async (time) => {
    const rn = new Date();

    const reminders = await Reminder.find({
        reminded: false,
        reminderDate: {$lt: rn}
    });

    for (const reminder of reminders){
        await sendMessage(reminder);
    }
};

const sendMessage = async (reminder) => {
    const rn = new Date();
    const channel = client.channels.get(reminder.channelId);
    const guild = client.guilds.get(reminder.guildId);
    const user = guild.members.get(reminder.authorId);
    await channel.send(`Hey ${user}, you wanted me to remind you about \`${reminder.messageContent}\``);
    const dmChannel = await user.createDM();
    const delay = rn.getTime() - reminder.reminderDate.getTime();
    const delayApology = delay > 10* 60*1000 ? `We apologise for the delay of ${delay/60000} minutes.` : "";
    await dmChannel.send(`Hey ${user}, this is a direct message regarding the reminder you set in the
     channel: \`${channel.name}\` of 
     guild: \`${guild}\`
     regarding: \`${reminder.messageContent}\`
     ` + delayApology);
    reminder.reminded = true;
    await reminder.save();
};

const timeout = ms => new Promise(resolve => setTimeout(resolve,ms));

const continouslySendMessages = async (duration) => {
    while (1){
        await timeout(1000);
        console.log("ooo");
        await sendMessages(duration);
    }
};

module.exports = continouslySendMessages;