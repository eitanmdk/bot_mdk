const db = require('quick.db')
const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
  name: "work",
  alias: [],

async execute (client, message, args){

  let user = message.author;
  let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

  let timeout = 60000;





 }
}