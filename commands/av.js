const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "av",
  alias: [],

execute (client, message, args){
  
  const embed = new Discord.MessageEmbed()
    .setColor('#FF8B00')
    .setTimestamp()
    .setTitle('YOUR AVATAR')
    .setImage(message.author.displayAvatarURL())
    message.channel.send(embed)

 }
}


