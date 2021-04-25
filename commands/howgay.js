const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "howgay",
  alias: [],

async execute (client, message, args){

  let randomPorcentaje = Math.floor(Math.random() * 24) * 4
  let usuario = await client.users.cache.get(args[0])
  if(!usuario) usuario = message.mentions.users.first()
  if(!usuario) usuario = message.author

  if(usuario.id == 'listo'){
  const hola = new Discord.MessageEmbed()
  .setAuthor(usuario.username, usuario.displayAvatarURL({dynamic: true}))
  .setDescription(`***${usuario}*** is a 0% gay 🌈🌈 !! `)
  .setColor('RANDOM')
  .setFooter('...')
   message.channel.send(hola)

  return;

  }

  const a = new Discord.MessageEmbed()
  .setAuthor(usuario.username, usuario.displayAvatarURL({dynamic: true}))
  .setDescription(`***${usuario}*** is a ${randomPorcentaje}% gay 🌈🌈 !! `)
  .setFooter('...')
  .setColor('RANDOM')
  message.channel.send(a)
 }
}
