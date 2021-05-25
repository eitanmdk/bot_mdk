const Discord = require('discord.js')
const db = require("megadb")
const channellogs = new db.crearDB("logs")
const client = new Discord.Client();

module.exports = async (client, emojiCreate) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("Emoji creado")
  .setDescription(`Nombre: **${emojiCreate.name}**\nID: **${emojiCreate.id}**\nEmoji: <:${emojiCreate.name}:${emojiCreate.id}>`)
  .setColor("RANDOM")

const channell = await channellogs.obtener(emojiCreate.guild.id)
if(!channell) return;
client.channels.cache.get(channell).send(embed)

  
}