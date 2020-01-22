const Discord = require("discord.js"); //includa discord.js

module.exports.run = async (bot, message, args) =>  //začetek modula tukaj notri, kaj se zgodi, ko se izvede komanda
{
    let bIcon = bot.user.displayAvatarURL; // določi lokalno spremenjivko bicon in doda njeno vrednost kot sliko ikone bota

    let botEmbed = new Discord.RichEmbed()//ustvari kopijo objekta iz discord.js knjišnice 
    .setDescription("Bot information") //Doda opis
    .setColor("#ff7200") //pokaže barvo stripa na strani
    .setThumbnail(bIcon)//pokaže sliko bicon
    .addField("Bot Name", bot.user.username) //doda polje bot name in v novi vrstici izpiše ime
    .addField("Created on", bot.user.createdAt);//doda polje created on in v novi vrstici izpiše datum, kdaj je bil bot ustvarjen

    return message.channel.send(botEmbed); //pošlje zgoraj narejeno sporočilo, ki je definirano kot objekt botembed
}

module.exports.help = {
    name:"botinfo" //ime komande
}