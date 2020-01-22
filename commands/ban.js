const Discord = require("discord.js"); //includa discord.js

module.exports.run = async (bot, message, args) =>  //začetek modula tukaj notri, kaj se zgodi, ko se izvede komanda
{
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) message.channel.send("Can't find user.");
    let bReason = args.join(" ").slice(22); //dobi argument
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No permission");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked");


    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("banned User", `${bUser} with ID ${bUser.id}`)
    .addField("banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let banChannel = message.guild.channels.find(`name`, "incidents");
    if(!banChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);

    banChannel.send(banEmbed);
  
}

module.exports.help = {
    name:"ban" //ime komande
}