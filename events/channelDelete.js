const Discord = require('discord.js')
const db = require("megadb")
const channellogs = new db.crearDB("logs")
const client = new Discord.Client();

module.exports = async (client, channelDelete) => {



const embedd  = new Discord.MessageEmbed()
.setTitle('Channel Deleted')
.setDescription(`Name: **${channelDelete.name}** \nCathegory **${channelDelete.parent}**\n ID: **${channelDelete.id}** \nType: **${channelDelete.type}**`)
.setColor('RANDOM')
.setTimestamp()
const channell = await channellogs.obtener(channelDelete.guild.id)
if(!channell) return;
client.channels.cache.get(channell).send(embedd)

  
}