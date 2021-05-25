const Discord = require('discord.js');
const db = require("megadb")
const channellogs = new db.crearDB("logs")
const client = new Discord.Client();


module.exports = async (client, roleCreate) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("Rol creado")
  .setDescription(`Role: **${roleCreate}**\n ID: ${roleCreate.id}`)
  .setTimestamp()
  .setColor('RANDOM')

const channell = await channellogs.obtener(roleCreate.guild.id)
if(!channell) return;
client.channels.cache.get(channell).send(embed)

  
 
}