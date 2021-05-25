const Discord = require('discord.js')
const db = require("megadb")
const channellogs = new db.crearDB("logs")
const client = new Discord.Client();


module.exports = async (client, channelCreate) => {



const embedc  = new Discord.MessageEmbed()
.setTitle('Channel Created')
.setDescription(`Name: **${channelCreate.name}** \nCathegory **${channelCreate.parent}**\n ID: **${channelCreate.id}** \nType: **${channelCreate.type}**`)
.setColor('RANDOM')
.setTimestamp()

const channell = await channellogs.obtener(channelCreate.guild.id)
if(!channell) return;
client.channels.cache.get(channell).send(embedc)

  
}