const Discord = require('discord.js');

class Client extends Discord.Client{
    constructor(props){
        super(props);
    }

    on (event, ...functions){
        super.on(event,async res => {
            for (const func of functions){
                try{
                    res = func(res);
                    if (res instanceof Promise){
                        res = await res;
                    }
                }
                catch (err) {
                    console.log(new Date(),`fname:"${func.name}"`,err.message);
                    res = null;
                }
                if (res === null || res === undefined){
                    // Break the chain on null or undefined
                    break
                }
            }
        })
    }
}

module.exports = Client;