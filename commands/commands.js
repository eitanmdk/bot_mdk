const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "commands",
  alias: [],

execute (client, message, args){

  const embed = new Discord.MessageEmbed()
  .setDescription(`I have **${client.commands.size}** commands`)
  .setColor("RANDOM")
  message.channel.send(embed)


 }
}