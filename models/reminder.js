const mongoose = require('mongoose');
var uniqid = require('uniqid');

const ReminderSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => uniqid()
    },
    messageContent : String,
    authorId: String,
    channelId: String,
    guildId: String,
    reminded: Boolean,
    reminderDate: Date,
});

module.exports = mongoose.model('reminder',ReminderSchema);