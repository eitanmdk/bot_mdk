const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
module.exports = {
  name: "report",
  alias: [],

 execute(client, message, args){

const reporte = args.join(" ")
if(!reporte) return message.channel.send("U need to write a report ya dum dum")
if(reporte) return message.channel.send("report sent")

const embed = new Discord.MessageEmbed()

.setTitle("New bug report !")
.setDescription(`The user **${message.author.username}** made a bug report \n\n Report: **${reporte}**!`)
.setFooter("New Bug Report")
.setColor("RANDOM")
client.channels.cache.get('827340926133338122').send(embed)

}


}

