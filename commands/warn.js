const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message. reply("no permission");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("couldn't find user");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return("no permission");
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = { //če so opozorila za uporabnika in če niso jih naredi
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if(err) console.log(err)
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("Warned User", `<@${wUser.id}>`)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

    let warnChannel = message.guild.channel.find(`name`, "incidents");
    if (!warnChannel) return message.reply("couldn't find channel");

    warnChannel.send(warnEmbed);

    if(warns[wUser.id].warns == 2)
    {
        let muterole = message.guild.roles.find(`name`, "muted");
        if(!muterole) return message.reply("You should create mute role");

        let mutetime = "10s";
        await(wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.id}> has been temp muted`);

        setTimeout(function(){
            wUser.removeRole(muterole.id)
            message.reply(`they've been unmuted`)
        }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 3)
    {
        message.guild.member(wUser).kick(reason);
        message.reply(`<@${wUser.id}> has been kicked`)
    }



}

module.exports.help = {
    name: "warn"
}