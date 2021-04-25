const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "serverinfo",
  alias: [],

execute (client, message, args){

  let embed = new Discord.MessageEmbed()
  .setTitle('server info')
  .setColor('RANDOM')
  .setDescription('Actual server info')
  .addField('Name of the server: ', message.guild.name)
  .addField('ID of the server: ', message.guild.id)
  .addField('Members: ', message.guild.memberCount)
  .addField('Creation of the server: ', message.guild.createdAt)
  .addField('Server Owner: ', message.guild.owner.displayName)
  .addField('Region of the server', message.guild.region)
  message.channel.send(embed)

 }
}