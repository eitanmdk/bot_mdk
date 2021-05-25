const db = require("megadb")
const logs = new db.crearDB("logs")
const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "removelogs",
  alias: [],

execute (client, message, args){

  var perms = message.member.hasPermission("MANAGE_CHANNELS")
  if(!perms) return message.channel.send("You dont have perms")

  if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I need the manage channels perm")

  if(!logs.tiene(message.guild.id)) return message.channel.send("You dont have logs setted")

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription("Ur logs was deleted")
  message.channel.send(embed)

  logs.eliminar(message.guild.id)

 }
}