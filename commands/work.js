const db = require('quick.db')
const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
  name: "work",
  alias: [],

async execute (client, message, args){

  let user = message.author;
  let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

  let timeout = 60;

  if(author !== null && timeout  - (Date.now() - author > 0)){
    let time = ms(timeout - (Date.now() - author));
    message.reply(`u already worked recently ${time}`)
  } else {
    let works = ['1', '2', '3', '4']
    let result = works[Math.floor(Math.random() * works.length)];
    let amount = Math.floor(Math.random() * 70) + 1;
   const desc = new Discord.MessageEmbed()
   .setDescription(`You worked ${result} and you earned ${amount}$`)
   .setColor('RANDOM')
    message.channel.send(desc)

    db.add(`money_${message.guild.id}_${user.id}`, amount)
    db.set(`work_${message.guild.id}_${user.id}`, Date.now())

     }
    }
   }