const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "crow",
  alias: [],

execute (client, message, args){
  const embed = new Discord.MessageEmbed()
    .setDescription('image of crow')
    .setTimestamp()
    .setTitle('crow')
    .setImage('https://cdn.discordapp.com/attachments/760494112398508092/775397965752959026/Crow_Men.png')
    message.channel.send(embed)
 }
}