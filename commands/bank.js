const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
  name: "bal",
  alias: ["balance"],

async execute (client, message, args){

  let user = message.mentions.users.first() || message.author;

  let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

  if(bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if(bank === null) bank = 0;

  const embed = new Discord.MessageEmbed()
  .setTitle(`${user.username}´s balance`)
  .addField(`Pocket: `, `${bal}$💸`, true)
  .addField(`Bank: `, `${bank}$🏦`, true)
  .addField(`All Money: `, `${bank + bal}$💵`, true)
  .setColor('RANDOM')
  message.channel.send(embed)



 }
}
