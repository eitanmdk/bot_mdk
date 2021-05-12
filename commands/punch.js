const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "punch",
  alias: [],

async execute (client, message, args){

  let cosa = ['https://media.giphy.com/media/YrfARBZkReL8Q/giphy.gif', 
'https://media.giphy.com/media/qPzZQtsv21zjy/giphy.gif',
'https://media.giphy.com/media/DuVRadBbaX6A8/giphy.gif', 
'https://media.giphy.com/media/mZxdBUPdsJYn6/giphy.gif',
'https://media.giphy.com/media/hzx9toaSQPHRm/giphy.gif',
'https://media.giphy.com/media/ExgYLDxhtdyec/giphy.gif',
'https://media.giphy.com/media/CeDZGQE0qWjkc/giphy.gif',
'https://media.giphy.com/media/1Bgr0VaRnx3pCZbaJa/giphy.gif',
'https://media.giphy.com/media/Z5zuypybI5dYc/giphy.gif',
'https://media.giphy.com/media/l3JDisfVJFuQWGq7m/giphy.gif',
'https://media.giphy.com/media/3ohc1292yKn6Z1saGs/giphy.gif',
'https://media.giphy.com/media/upT3Tbwupcbok/giphy.gif']
var enlace = cosa[Math.floor(Math.random() * cosa.length)]
if(!message.mentions.users.first()){
  const embed = new Discord.MessageEmbed()
  message.reply('U need to mention someone')
} else {
  let userm = message.mentions.users.first()

  const embed = new Discord.MessageEmbed()
  .setDescription("**" + message.author.username + "**" + " " + "Punched" + " " + "**" + userm.username + "**")
  .setImage(enlace)
  .setColor('RANDOM')

  message.channel.send({embed});
}
}
}
