const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
module.exports = {
  name: "help",
  alias: [],
execute (client, message, args){

  const firstembed = new Discord.MessageEmbed()
  .setTitle('Welcome to MDK BOT')
  .setDescription('React with 💸 to go the economy part\n\n React with 🤪 to go to the fun part \n\n react with 👮🏼‍♂️ to go the mod part\n\n React with 💣 to go the random part\n\n React with 🌐 to go to the others part\n\n React with 🎵 to go the music part\n\nReact with 🧪 to go the first part ')
  .setColor('RANDOM')
  .setImage("https://cdn.discordapp.com/attachments/839844761178603541/841802176888045598/standard.gif")

  const mod = new Discord.MessageEmbed()
  .setDescription("`kick`, `ban`, `purge`")
  .setTitle('Moderation')
  .setColor('RANDOM')

  const economyembed = new Discord.MessageEmbed()
  .setTitle("Economy")
  .setColor('RANDOM')
  .setDescription('`bal`, `work`, `deposit`')

  const funembed = new Discord.MessageEmbed()
  .setTitle("Fun")
  .setColor('RANDOM')
  .setDescription("`howgay`, `hack`, `meme eng`, `meme esp`, `mainkra`, `rps`, `peter griffin`, `punch`")

  const randomembed = new Discord.MessageEmbed()
  .setTitle("Random")
  .setColor('RANDOM')
  .setDescription("`crow`, `badface`, `noob`, `dormir`, `tu mama`, `maik wasowski`")
  
  const othersembed = new Discord.MessageEmbed()
  .setTitle("Others")
  .setColor('RANDOM')
  .setDescription("`ping`, `suggest`, `report`, `invite`, `say`, `twitch`, `youtube`, `changelog`, `info`, `commands`, `servers`, `users`, `page`, `av`")

  const musicembed = new Discord.MessageEmbed()
  .setTitle("Music")
  .setColor('RANDOM')
  .setDescription("`best-music`, `play`")

  message.author.send(firstembed).then(message.channel.send("I sent you a dm")).then(msg => {
    msg.react("💸")
    msg.react("🤪")
    msg.react("👮🏼‍♂️")
    msg.react("💣")
    msg.react("🌐")
    msg.react("🎵")
    msg.react("🧪")
    msg.awaitReactions((reaction, user) => {

      if(message.author.id !== user.id) return;
      if(reaction.emoji.name === "💸"){
      msg.edit(economyembed)

      }
      if(reaction.emoji.name === "🤪"){
      msg.edit(funembed)

      }
      if(reaction.emoji.name === "👮🏼‍♂️"){
      msg.edit(mod)

      }
      if(reaction.emoji.name === "🧪"){
      msg.edit(firstembed)

      }
      if(reaction.emoji.name === "💣"){
      msg.edit(randomembed)

      }
      if(reaction.emoji.name === "🌐"){
      msg.edit(othersembed)

      }
      if(reaction.emoji.name === "🎵"){
      msg.edit(musicembed)

      }
      
    })
  })

 }
}