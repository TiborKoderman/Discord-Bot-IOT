const Discord = require("discord.js"); //includa discord.js

module.exports.run = async (bot, message, args) =>  //začetek modula tukaj notri, kaj se zgodi, ko se izvede komanda
{
    let sIcon = message.guild.iconURL; //message-v serverju j ki je bilo poslano, guild - objekt guild, display - slika serverja

    let serverEmbed = new Discord.RichEmbed()
    .setDescription("Server information")
    .setColor("#ff7200")
    .setThumbnail(sIcon)
    .addField("Server Name", message.guild.name)//ime strežika
    .addField("Created On", message.guild.createdAt)//kdaj je bil narejen strežnik
    .addField("You Joined", message.member.joinedAt)//kdaj se je uporabnik pridružil
    .addField("Total Members", message.guild.memberCount);//skupno število članov

    return message.channel.send(serverEmbed); //sporoči objekt
}

module.exports.help = {
    name:"serverinfo" //ime komande
}