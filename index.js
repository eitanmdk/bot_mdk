////////constantes/////////
const Discord = require('discord.js');
const client = new Discord.Client();
const express = require ('express')
const http = require("http");
const app = express()
const Fs = require("fs");
const fs = require("fs");
let { readdirSync } = require('fs');
const ms = require("ms");
const bot = new Discord.Client()
const Enmap = require("enmap");
const config = require("./config.json");
let prefix = process.env.PREFIX;

////////handler//////

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {

client.queue = new Map()
client.snipes = new Map()

  if(message.author.bot) return;


  if(!message.content.startsWith(prefix)) return;

  let usuario = message.mentions.members.first() || message.member; 
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
if(cmd){
cmd.execute(client, message, args)


}
  if(!cmd){
    const noexiste = new Discord.MessageEmbed()
    .setTitle("ERROR 404")
    .setDescription("**Oops I think that commmand dont exit check the spelling and try again please**")
    .setColor("RANDOM")
    .setTimestamp()

    message.channel.send(noexiste)
  }
})
client.on('messageDelete', message => {
  client.snipes.set(message.channel.id, {
    content: message.content,
    delete: message.author,
    canal: message.channel
  })
})
/////////////event//////////////
for(const file of readdirSync('./events')){
  if(file.endsWith('.js')){
    let fileName = file.substring(0, file.length - 3)

    let fileContent = require(`./events/${file}`)

    client.on(fileName, fileContent.bind(null, client))
  }
}
////////////server/////////////

require('dotenv').config();
app.get('/', function(req, res){
  res.send('MDK BOT XDDDD')
})
let port = process.env.PORT || 3000;
app.listen(port)

require('dotenv').config()


///////////comandos////////////
client.on('message', msg => {
  if(msg.content === prefix + 'bruh') {
    msg.reply('https://i.ytimg.com/vi/ZF57zsOWdB0/maxresdefault.jpg')
  }
});
client.on('message', msg => {
  if(msg.content === 'join heist') {
    msg.react('😠')
  }
});
client.on('message', msg => {
  if (msg.content === prefix + 'bailar') {
    msg.reply('<a:vailado:783076196664737803><a:vailado:783076196664737803> ');
  }
});
client.on('message', msg => {
  if (msg.content === prefix + 'german') {
    msg.channel.send('TU MAMA EN TANGA');
  }
});
client.on('message', msg => {
  if (msg.content === prefix + 'germanfrase') {
    
    msg.reply('TU MAMA');
    
  }
});

client.on('message', msg => {
  if(msg.content === prefix + 'dormir') {
  msg.reply('wenas noches ;)')
  }
});
client.on('message', msg => {
  if(msg.content === prefix + 'economy') {
  msg.reply('ecconomy system is remastering')
  }
});
client.on('message', msg => {
  if(msg.content === prefix + 'dato')
  msg.reply('<a:vailado:783076196664737803>eitan es un noob en los shooters de roblox<a:vailado:783076196664737803>')
});
client.on('message', msg => {
  if(msg.content === prefix + 'tu mama')
  msg.reply('EN TANGA XDDDDD')
});
client.on('message', msg => {
  if(msg.content === prefix + 'UwU')
  msg.reply('UwU, OwO, AwA')
});
client.on('message', msg =>  {
  if(msg.content === prefix + 'jaja')
  msg.reply('https://abcespblog.files.wordpress.com/2019/10/c3adndice.png')
});
//////////////slash////////////

client.on('ready', async () => {
  async function createApiMessage(interaction, content){
    const apiMessage = await APIMessage.create(client.channels.resolve(interaction.channel_id), content)
    .resolveData()
    .resolveFiles()

    return { ...apiMessage.data, files : apiMessage.files };

}
client.api.applications(client.user.id).commands.post({
  data: {
    name:'test',
    description:'test bro dont use'
     }
  });
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  const command = interaction.data.name.toLowerCase();
  const args = interaction.data.options;

  if(command === 'test'){
    client.api.interaction(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content:"test"
        }
      }
    })
  }
})


//////////////////embeds//////////////////

client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of cringeman')
    .setTimestamp()
    .setTitle('cringeman')
    .setImage('https://i.ytimg.com/vi/npQtRmpe3mg/maxresdefault.jpg')
          if (msg.content.startsWith(prefix + 'cringeman')) {
    msg.reply(embed)
          }
      });   
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of a noob')
    .setTimestamp()
    .setTitle('noob')
    .setImage('https://i.pinimg.com/originals/0c/85/c5/0c85c5f418fad1c881389fb8ce3ea8c4.png')
          if (msg.content.startsWith(prefix + 'noob')) {
    msg.reply(embed)
          }
      });   
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of maik wasowski')
    .setTimestamp()
    .setTitle('maik wasowski')
    .setImage('https://ih1.redbubble.net/image.909979035.9762/flat,1000x1000,075,f.jpg')
    if (msg.content.startsWith(prefix + 'maik wasowski')) {
    msg.reply(embed)
          }
      }); 

  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of a bad face')
    .setTimestamp()
    .setTitle('BAD FACE')
    .setImage('https://i.pinimg.com/originals/f9/be/3c/f9be3c86216a46d55f3aec1a991647f7.jpg')
    if (msg.content.startsWith(prefix + 'badface')) {
    msg.reply(embed)
          }
      }); 
              client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of salt')
    .setTimestamp()
    .setTitle('salt')
    .setImage('http://t0.gstatic.com/images?q=tbn:ANd9GcSKMJq2bjBIODuOnHYFVUs7JTv1l4-WJNMxu8VvIrUtPxM2lX8erCQXA5jRHOdMYTabWieUiagQKt9WNT9iptI')
    if (msg.content.startsWith(prefix + 'salt')) {
    msg.reply(embed)
          }
      }); 
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of queee')
    .setTimestamp()
    .setTitle('queee')
    .setImage('https://media1.tenor.com/images/d0453d92365c37e233d6678b80cc8e2b/tenor.gif?itemid=16001356')
    if (msg.content.startsWith(prefix + 'queee')) {
    msg.reply(embed)
          }
               })
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of auto')
    .setTimestamp()
    .setTitle('auto')
    .setImage('https://media.giphy.com/media/WApIcl7whuH3W/giphy.gif')
    if (msg.content.startsWith(prefix + 'auto')) {
    msg.reply(embed)
          }
               })
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of a chau')
    .setTimestamp()
    .setTitle('chau')
    .setImage('https://media.tenor.com/images/5351263ef85842804aafb923cd816983/tenor.gif')
    if (msg.content.startsWith(prefix + 'chau')) {
    msg.reply(embed)
          }
               })

////////////token///////////////
client.login(process.env.TOKEN);