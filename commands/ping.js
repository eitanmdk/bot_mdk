const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports = {
  name: "ping",
  alias: [],

execute (client, message, args){

message.channel.send(`Pong **(${Date.now() - message.createdTimestamp}ms)**`)

 }
}