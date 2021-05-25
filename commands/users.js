const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "users",
  alias: [],

execute (client, message, args){
  const server = new Discord.MessageEmbed()
  .setDescription(`I serve **${client.users.cache.size}** users`)
  .setColor("RANDOM")
  message.channel.send(server)

 }
}