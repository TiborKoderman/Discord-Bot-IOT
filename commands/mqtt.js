const Discord = require("discord.js"); //includa discord.js
const fs = require("fs");

module.exports.run = async (bot, message, args) =>  //začetek modula tukaj notri, kaj se zgodi, ko se izvede komanda
{
    let value = Math.floor(Math.random() * 6);
    switch(value)
    {
        case 0:
        message.channel.send("You have rolled:", {files: ["./images/dice1.png"]});
        return;

        case 1:
        message.channel.send("You have rolled:", {files: ["./images/dice2.png"]});
        return;

        case 2:
        message.channel.send("You have rolled:", {files: ["./images/dice3.png"]});
        return;

        case 3:
        message.channel.send("You have rolled:", {files: ["./images/dice4.png"]});
        return;

        case 4:
        message.channel.send("You have rolled:", {files: ["./images/dice5.png"]});
        return;

        case 5:
        message.channel.send("You have rolled:", {files: ["./images/dice6.png"]});
        return;
    }
}

module.exports.help = {
    name:"rolldice" //ime komande
}