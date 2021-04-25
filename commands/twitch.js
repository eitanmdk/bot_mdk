const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "twitch",
  alias: [],

execute (client, message, args){
const embed = new Discord.MessageEmbed()
  .setColor('#6C0ED7')
    .setTimestamp()
    .setTitle('MY TWITCH')
    .setURL('https://www.twitch.tv/eit4nmdk')
    message.channel.send(embed)

 }
}