const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "invite",
  alias: [],

execute (client, message, args){

  const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle('INVITE THE BOT')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=769400040962916382&permissions=8&scope=bot')
    .setColor('RANDOM')
    message.channel.send(embed)

 }
}