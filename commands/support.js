const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "support",
  alias: [],

execute (client, message, args){
    const embed = new Discord.MessageEmbed()
  .setColor('#A92C56')
    .setTimestamp()
    .setTitle('SUPPORT SERVER')
    .setURL('https://discord.com/invite/Zb3CujRsxT')
    message.channel.send(embed)

 }
}