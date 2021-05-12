const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const prefix_db = new db.crearDB('prefix')

module.exports = {
  name: "setPrefix",
  alias: [],

execute (client, message, args){

  var perms = message.guild.member.hasPermissions("MANAGE_MESSAGES")
  if(!perms) return message.channel.send('You cant use this command you need manage msgs permission')

  if(!args[0]) return message.channel.send('U need tu write something')
  message.guild.owner.send(`the prefix has been changed to **${args[0]}**`)
  prefix_db.establecer(message.guild.id, args[0])

  message.channel.send(`the prefix has been changed to **${args[0]}**`)

 }
}
