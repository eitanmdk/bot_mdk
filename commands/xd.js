const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "molestar", //Aquí ponemos el nombre del comando
  alias: [], //Aquí un alias, esto será como un segundo nombre del comando, si no quieren ponerle alias tenéis que quitarle las " " y dejarlo así: alias: [],

execute (client, message, args){

  if(message.author.id !== '547953269918400515') return message.channel.send('u cant use this command dum dum only the creator')

const xd = args.join(" ")

client.users.cache.get('749979048951939122').send('desblokeame soi eitan')
}

}
