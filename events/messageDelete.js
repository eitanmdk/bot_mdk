const Discord = require('discord.js');
const db = require("megadb")
const channellogs = new db.crearDB("logs")
const client = new Discord.Client();


module.exports = async (client, messageDelete) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("Message deleted")
  .setDescription(`Message: **${messageDelete}**\nAuthor: **${messageDelete.author.tag}**\n Channel: **${messageDelete.channel}**\n**${messageDelete.id}**`)
  .setColor('RANDOM')

const channell = await channellogs.obtener(messageDelete.guild.id)
if(!channell) return;
client.channels.cache.get(channell).send(embed)

 
}