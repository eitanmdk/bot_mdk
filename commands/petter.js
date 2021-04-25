const Discord = require('discord.js');
const client = new Discord.Client();
const Canvas = require('canvas')
const { Client, MessageEmbed } = require('discord.js');
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: "petter-griffin",
  alias: [],

async execute (client, message, args){
 const canvas = Canvas.createCanvas(500,500)
 const usuario = message.mentions.members.first() || message.author; 
 const ctx = canvas.getContext("2d")
 const background = await Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT86FzcgK6tK9UCz8HjhlDleJnEAifvqH6QwxZV0aSPkWVp2RXEGFwcih-BDIb4kTiEuIQ&usqp=CAU')
 ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
 const y=3.5, radio=120, x=canvas.width/1.8-radio
 ctx.save()
 ctx.beginPath()
 ctx.arc(x+radio, y+radio, radio, 0, Math.PI * 2, true)
 ctx.closePath()
 ctx.clip()
 const imagen = await Canvas.loadImage(usuario.displayAvatarURL({format:"png"}))
 ctx.drawImage(imagen, x, y, radio*2, radio*2)
 const attach = new MessageAttachment(canvas.toBuffer(),"homer.png")
 return message.channel.send(attach)

 }
}