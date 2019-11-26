const chrono = require('chrono-node');

const parse = (msg) => {
    /*
    Inspired from remindemebot on reddit
     */

    let options = {};

    const messageString = msg.cleanContent;

    const result = chrono.parse(messageString);

    if (result.length === 0){
        // Date parse failed
        options.error = true;
        options.message = "Date parsing failed.";
        return options;
    }

    const reminderDate = result[0].start.date();
    if (reminderDate < new Date()){
        options.error = true;
        options.message = "Can't remind you in the past.";
        return options;
    }

    options = {
        error : false,
        messageContent:msg.cleanContent,
        authorId: msg.author.id,
        channelId: msg.channel.id,
        guildId: msg.channel.guild.id,
        reminded: false,
        reminderDate: reminderDate
    };

    return options;



};

module.exports = parse;