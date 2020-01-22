const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {


    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); // dobi prvo omembo ali argument 0
    if (!tomute) return message.reply("Couldn't fnd user."); //se vrne, če nima pravic
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them"); //prepreč, da bi bil nekdo z dovoljenji mutan
    let muterole = message.guild.roles.find(`name`, "muted") //poišče role "muted"
    if(!muterole) //če role ne obstaja ga naredi
    {
        try
        {
            muterole = await message.guild.createRole({ //naredi role in mu določi lastnosti
                name: "muted", //da ime rolu
                color: "#ffffff", //določi barvo, rola
                permissions:[] //določi array dovoljenj (perissionov)
            })
            message.guild.channels.forEach(async (channel, id) => { //gre skozi vse kanale in spremeni dovoljena
                await channel.overwritePermissions(muterole, { //prepiše dovoljenja za kanal
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e)
        {
            console.log(e.stack);
        }
    }
    //end of create role

    let mutetime = args[1]; //določi mutetime kot drugi argument
    if(!mutetime) return message.reply("You didn't specify the time!"); //če ni argumenta

    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    //kdaj odstrani role
    setTimeout(function(){
        tomute.removeRole(muterole.id); //odstrani role
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime)); //kdaj se konča

}

module.exports.help = {
    name: "tempmute"
}