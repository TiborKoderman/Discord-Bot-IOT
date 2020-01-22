const Discord = require("discord.js"); //includa discord.js

module.exports.run = async (bot, message, args) =>  //začetek modula tukaj notri, kaj se zgodi, ko se izvede komanda
{
    return message.channel.send("Hello world!"); //pošlji sporočilo
}

module.exports.help = {
    name:"hello" //ime komande
}