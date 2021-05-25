const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "av",
  alias: ["avatar"],

execute (client, message, args){
  const user = message.mentions.users.first() || message.author;
  
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setTitle(`THE AVATAR OF **${user.tag}**`)
    .setImage(user.displayAvatarURL())
    message.channel.send(embed)

 }
}


