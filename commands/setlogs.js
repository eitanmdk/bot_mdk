const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require("megadb")
const logs = new db.crearDB("logs")

module.exports = {
  name: "setlogs",
  alias: [],

execute (client, message, args){

const id = args[0]
if(!id) return message.channel.send('Thats not a channel valid')

const channel = message.mentions.channels.first() || client.channels.cache.get(id)
if(!channel) return message.channel.send("That channel is not valid")

let channelserver = message.guild.channels.resolve(channel.id)
if(!channelserver) return message.channel.send("U need to mention a channel")

logs.establecer(message.guild.id, channel.id)

const finish = new Discord.MessageEmbed()
.setDescription("Logs has been setted")
.setColor("RANDOM")
message.channel.send(finish)

 }
}