const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "about", //Aquí ponemos el nombre del comando
  alias: [], //Aquí un alias, esto será como un segundo nombre del comando, si no quieren ponerle alias tenéis que quitarle las " " y dejarlo así: alias: [],

execute (client, message, args){

  if(message.author.id !== '547953269918400515') return message.channel.send('u cant use this command dum dum only the creator')

const about = args.join(" ")
 const embed = new Discord.MessageEmbed()

.setTitle("About MDK BOT.")
.setDescription(`Bassicly the informtion of my bot`)
.addField('creation', 'created on 4/11/2020')
.addField('version', 'version 2.84')
.addField('creator', 'the creator is EitanMdk a very very very little developer on javascript')
.addField('language', 'node.js (javascript)')
.setFooter("By EitanMdk#0303")
.setColor("RANDOM")
message.channel.send(embed)

}
}


