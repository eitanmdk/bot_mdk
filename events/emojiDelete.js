const Discord = require('discord.js')
const db = require("megadb")
const channellogs = new db.crearDB("logs")
const client = new Discord.Client();

module.exports = async (client, emojiDelete) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("Emoji eliminado")
  .setDescription(`Nombre: **${emojiDelete.name}**\nID: **${emojiDelete.id}**`)
  .setColor("RANDOM")

const channell = await channellogs.obtener(emojiDelete.guild.id)
if(!channell) return;
client.channels.cache.get(channell).send(embed)

  
}