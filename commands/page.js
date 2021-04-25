const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "web",
  alias: [],

execute (client, message, args){

  const embed = new Discord.MessageEmbed()
  .setColor('#2CA93D')
    .setTimestamp()
    .setTitle('MY PAGE')
    .setURL('https://bot-mdk.zyrosite.com/')
    message.channel.send(embed)

 }
}