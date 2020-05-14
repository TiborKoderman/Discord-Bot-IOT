const botconfig = require("./botconfig.json"); //doda botconfig.json kot vir informacij
const tokenfile = require("./token.json");  //doda file z napisanim tokenom in ga shrani pod imenom tokenfile
const Discord = require("discord.js"); //include Discord library
const fs = require("fs"); //includa file system (ki je del node)

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://koderman.net')

const bot = new Discord.Client({disableEveryone: true}); //definira konstanto bot
bot.commands = new Discord.Collection(); //definiramo botcommands kot discord coollection(A Map with additional utility methods. This is used throughout discord.js rather than Arrays for anything that has an ID, for significantly improved performance and ease-of-use.)

//COMMAND HANDELER
fs.readdir("./commands", (err,files) => { //pogleda v mapo commands

  if(err) console.log(err); //logira napako

  let jsfile = files.filter(f => f.split(".").pop() === "js") //v spremenljivko jsfile shrani prvi del imena, brez .js (loči s piko n odstrani js)
  if(jsfile.length <= 0)
  {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f,i) =>{ //toliko kot je datotek
    let props = require(`./commands/${f}`); //spremenljivka props je path do komande (f je število komande v arreju), poleg tega ustvari objekt ${f}
    console.log(`${f} loaded!`); //sporoči, da je bilo uspešno
    bot.commands.set(props.help.name, props);
  });

});

//------------------------------------------------------------------------------------\\

let prevmsg1 = '';
let prevmsg2 = '';
let prevmsg3 = '';
let composedmsg = '';

bot.on("ready", async () => { //če je bot pripravljen
  console.log(`${bot.user.username} is online`); //v konzolo izpiše, da je pripravljen
  bot.user.setActivity("with test subjects", {type:"PLAYING"}); // nastavi napis
});

  //commande
bot.on("message", async message => { //na sporočilo
  if(message.author.bot) return; //ne odgovarja na lastna sporočila
  if(message.channel.type === "dm") return; //ne odgovarja v dm-jih

  let prefix = botconfig.prefix; //določi, kaj naredi s prefixom
  let messageArray = message.content.split(" "); //loči dele komande z Spaceom in shrani v tabelo imenovano messageArray
  let cmd = messageArray[0]; //pregleda prvi del arraya, to je komanda
  let args = messageArray.slice(1); //odstrani prvi del in jih shrani posamezno kot argument


  let commandfile = bot.commands.get(cmd.slice(prefix.length)); //dobi datoteko s kodo
  if(commandfile) commandfile.run(bot, message, args);//če command file s tem imenom obstaja, ga zaženi

  if(message.content.length <14*3){
    prevmsg3 = prevmsg2;
    prevmsg2 = prevmsg1;
    prevmsg1=  `${message.member.displayName}`+':\n' + message.content + '\n-------------\n';
    
    composedmsg = prevmsg1 + prevmsg2 + prevmsg3;
    console.log(composedmsg);
  
    client.publish('Besedilo', composedmsg);
  }
  


  if(message.content.startsWith(prefix+'clean')) {
    let check = message.content.split(prefix+'clean')[1]; // Condition, in this case if it containts a certain string
    message.channel.fetchMessages().then(msgs => { // Get messages to check
      let messageDel = msgs.filter(msgss => msgss.content.includes(check)) // Finds all messages with 'check'
      message.channel.bulkDelete(messageDel) // Deletes all messages that got found
    });

  prevmsg1 = '';
  prevmsg2 = '';
  prevmsg3 = '';
  composedmsg = '';
  composedmsg = prevmsg1 + prevmsg2 + prevmsg3;
  console.log(composedmsg);

  client.publish('Besedilo', composedmsg);
  }
});




bot.login(tokenfile.token); //ga prijavi s tokenom
