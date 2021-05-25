const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db')
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: `deposit`,
  alias: ["dep"],

async execute (client, message, args){
  let user = message.author;
  let member = db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if(args[0] == 'all'){
  let money = db.fetch(`money_${message.guild.id}_${user.id}`)
  let bank = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if(money === 0) return message.channel.send(`U dont have money to deposit`)

  db.add(`bank_${message.guild.id}_${user.id}`, money)
  db.subtract(`money_${message.guild.id}_${user.id}`, money)
  message.channel.send("You deposit all ur money!!")
  } else {
    if(!args[0]) return message.channel.send("Specify an amount of coins to deposit")
    if(message.content.includes("-")){
      return message.channel.send("You need to write a positive amount of coins to deposit")
    }
  if(member < args[0]){
    message.channel.send("You dont have that much money")
  }
  message.channel.send(`You have deposited ${args[0]} on your bank`)

  db.add(`bank_${message.guild.id}_${user.id}`, args[0])
  db.subtract(`money_${message.guild.id}_${user.id}`, args[0])
  }
 }
}