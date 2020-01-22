const Discord = require("discord.js"); //includa discord.js

module.exports.run = async (bot, message, args) =>  //začetek modula tukaj notri, kaj se zgodi, ko se izvede komanda
{
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) message.channel.send("Can't find user.");
    let kReason = args.join(" ").slice(22); //dobi argument
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No permission");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked");


    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
    name:"kick" //ime komande
}