const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "say", //Aquí ponemos el nombre del comando
  alias: [], //Aquí un alias, esto será como un segundo nombre del comando, si no quieren ponerle alias tenéis que quitarle las " " y dejarlo así: alias: [],

execute (client, message, args){

  var perms = message.member.hasPermission("ADMINISTRATOR")
  if(!perms) return message.channel.send("U dont have admin to use this command")

  let texto = args.join(` `)
  if(!texto) return message.channel.send("U need to say something after the command")

  message.channel.send(texto)

 }

} 