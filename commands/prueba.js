const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "test", //Aquí ponemos el nombre del comando
  alias: [], //Aquí un alias, esto será como un segundo nombre del comando, si no quieren ponerle alias tenéis que quitarle las " " y dejarlo así: alias: [],

execute (client, message, args){

  if(message.author.id !== '547953269918400515') return message.channel.send('u cant use this command dum dum only the creator')

const reporte = args.join(" ")
if(!reporte) return message.channel.send("U need to write a report ya dum dum")
 const embed = new Discord.MessageEmbed()

.setTitle("New bug report !")
.setDescription(`The user **${message.author.username}** made a bug report \n\n Report: **${reporte}**!`)
.setFooter("New Bug Report")
.setColor("RED")
client.users.cache.get('547953269918400515').send(embed)
}

}

