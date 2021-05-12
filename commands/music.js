const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "music",
  alias: [],

execute (client, message, args){
const help = args.join(" ")
  if(message.author.id !== '547953269918400515') return message.channel.send('u cant use this command dum dum only the creator')

  const embed = new Discord.MessageEmbed()
    .setColor('#1BEC0A')
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()
    .setTitle('COMMANDS OF MUSIC')
    .addField('best music', '`m!best-music` for the best music')
    .addField('play', '`m!play` for search music')
    message.channel.send(embed)

 }
}