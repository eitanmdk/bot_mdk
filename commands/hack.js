const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "hack",
  alias: [],

execute (client, message, args){
  let bot = client.user.username;
  let botavatar = client.user.avatarURL();

  let user = message.author;
  let useravatar = message.author.avatarURL();

  let userhack = message.mentions.users.first();
  if(!userhack) return message.channel.send('u need to mention somebody to hack bro :/')

  let nombres = ["test", "tobtop", "messi", "hola"]
  let ips = ["180.0.0.0", "190.0.0.0"]
  let correos = ["TROLEADORCARA@gmail.com", "tumama@gmail.com"]
  let contraseñas = ["constraseñasecreta", "comomoco1234", "123456", "arribalospibes"]

  const hack = new Discord.MessageEmbed()
  .setTitle('HACKED')
  .addField('Who typed the comm: ', user.tag)
  .addField("name: ", nombres[Math.floor(Math.random() * nombres.length)])
  .addField("ip: ", ips[Math.floor(Math.random() * nombres.length)])
  .addField('mail: ', correos[Math.floor(Math.random() * nombres.length)])
  .addField("password: ", contraseñas[Math.floor(Math.random() * nombres.length)])
  .setColor('RANDOM')
  .setFooter(user.username, useravatar)
  message.channel.send(hack)



 }
}