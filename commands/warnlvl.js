const Discord = require("discord.js"); //includa discord.js
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));


module.exports.run = async (bot, message, args) =>  //začetek modula tukaj notri, kaj se zgodi, ko se izvede komanda
{
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you can't do that");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("couldn't find user");
  let warnlevel = warns[wUser.id].warns;

  message.channel.send(`<@${wUser.id}> has ${warnlevel} warnings`)
}

module.exports.help = {
    name:"warnlvl" //ime komande
}