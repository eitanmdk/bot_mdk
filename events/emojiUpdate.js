const Discord = require('discord.js')
const db = require("megadb")
const channellogs = new db.crearDB("logs")
const client = new Discord.Client();

module.exports = async (client, oldEmoji, newEmoji) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("Emoji actualizado")
  .setDescription(`Antiguo nombre: **${oldEmoji.name}**\nNuevo nombre: **${newEmoji.name}**\nID: **${newEmoji.id}**`)
  .setColor("RANDOM")

const channell = await channellogs.obtener(emojiUpdate.guild.id)
if(!channell) return;
client.channels.cache.get(channell).send(embed)

  
}