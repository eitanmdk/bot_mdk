const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "youtube",
  alias: [],

execute (client, message, args){

  const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor('#E74646')
    .setTitle('MY YOUTUBE')
    .setURL('https://www.youtube.com/c/eitanmdkoficial')
    message.channel.send(embed)

 }
}
