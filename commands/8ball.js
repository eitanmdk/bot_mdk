const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "8ball",
  alias: [],

execute (client, message, args){
  const jaja = args.join(" ")
  var hello = ["Yes", "No", "Probbably no", "Probbably yes"]
  const olaa = new Discord.MessageEmbed()
  .setTitle('8BALL')
  .addField(`${message.author.tag} Asks`, jaja)
  .addField(`My answer is:`, hello[Math.floor(Math.random() * hello.length)])
  .setColor('RANDOM')
  message.channel.send(olaa)

 }
}