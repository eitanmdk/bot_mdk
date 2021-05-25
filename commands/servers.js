const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "servers",
  alias: [],

execute (client, message, args){
  const server = new Discord.MessageEmbed()
  .setDescription(`Im on **${client.guilds.cache.size}** servers`)
  .setColor("RANDOM")
  message.channel.send(server)

 }
}