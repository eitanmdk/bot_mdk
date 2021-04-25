const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
module.exports = {
  name: "suggest",//le debes dar un nombre a tu comando
  alias: [],// puedes darle un alias si no quieres darle un alias simplemente dejalo vacio sin las comillas

 execute(client, message, args){

const reporte = args.join(" ")
if(!reporte) return message.channel.send("U need to write a suggestion")

const embed = new Discord.MessageEmbed()

.setTitle("New suggest !")
.setDescription(`The user **${message.author.username}** made a suggest \n\n Suggestion: **${reporte}**!`)
.setFooter("New suggestion")
.setColor("RANDOM")
client.channels.cache.get('826469736237629460').send(embed).then(async msg => {
  await msg.react("✅")
  await msg.react("❔") 
  await msg.react("❎").then; return message.channel.send('suggestion sent')
})

}

}