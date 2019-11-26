const fireEvents = async (msg) => {
    if (msg.channel.guild){
        if (msg.content.startsWith("!remindme")){
            msg.client.emit('setReminder',msg);
        }
    }
};

module.exports = fireEvents;