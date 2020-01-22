const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //!addrole @kdorkoli Role
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry you can't do that");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("couldn't find user");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("specify a role!");
    let gRole = message.guild.roles.find(`name`, role); //poišče role s tem imenom
    if(!gRole) return message.reply("Couldn't find that role."); //če ga ne najde

    if(!rMember.roles.has(gRole.id)) return message.reply("they don't have that role"); //če ima uporabnik role
    await(rMember.removeRole(gRole.id)); //če ne ta role doda

    try
    {
        await rMember.send(`Your role ${gRole.name} has been taken away.`);
    }
    catch(e)
    {
        message.channel.send(`<@${rMember.id}>'s role ${gRole.name} has been taken away`);
    }
}
module.exports.help = {
    name: "removerole"
}