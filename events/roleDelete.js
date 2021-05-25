const Discord = require('discord.js');
const db = require("megadb")
const channellogs = new db.crearDB("logs")
const client = new Discord.Client();


module.exports = async (client, roleDelete) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("Rol eliminado")
  .setDescription(`Role: **${roleDelete}**\n ID: ${roleDelete.id}`)
  .setTimestamp()
  .setColor('RANDOM')

const channell = await channellogs.obtener(roleDelete.guild.id)
if(!channell) return;
client.channels.cache.get(channell).send(embed)
  
 
}