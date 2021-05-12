const Discord = require('discord.js')
const db = require("megadb")
const channellogs = new db.crearDB("logs")


module.exports = async (client, oldMessage, newMessage) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("Message Updated")
  .setDescription(`Old message: **${oldMessage}**\n New Message: **${newMessage}**\n Author: **${newMessage.author.tag}**\n Channel: **${oldMessage.channel.name}**\n ID: **${newMessage.id}**`)
  .setColor("RANDOM")
const channell = await channellogs.obtener(newMessage.guild.id)
client.channels.cache.get(channell).send(embed)
  
}