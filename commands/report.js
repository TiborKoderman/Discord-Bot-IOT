const Discord = require("discord.js"); //includa discord.js

module.exports.run = async (bot, message, args) =>  //začetek modula tukaj notri, kaj se zgodi, ko se izvede komanda
{

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); //doda kot argument prvega @omenjenega uporabnika
    if(!rUser) return message.channel.send("Couldn't find user."); //če ne najde uporabnika (če je rUser prazen)
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#ff7200")
    .addField("Reported user", `${rUser} with ID: ${rUser.id}`) //koga smo prijavili
    .addField("Reported by", `${message.author} with ID ${message.author.id}`) //kdo ga je prijavil
    .addField("Channel", message.channel) //v katerem kanalu ga je prijavil
    .addField("Time", message.createdAt) //kdaj ga je prijavil
    .addField("Reason", reason); //razlog za prijavo (argument)

    let reportschannel = message.guild.channels.find(`name`, "reports"); //poišče kanal z imenom "Reports" na strežniku
    if(!reportschannel) return message.channel.send("Couldn't find #reports channel."); //če ni reports kanala

    message.delete().catch(O_o=>{}); //izbriše zadnje sporočilo   !!! bot potrebuje dovoljenje za brisanje sporočil

    return reportschannel.send(reportEmbed);
}

module.exports.help = {
    name:"report" //ime komande
}