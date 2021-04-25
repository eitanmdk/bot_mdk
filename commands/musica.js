const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "best-music",
  alias: [],

execute (client, message, args){

  const holaxd = args.join(" ")

    var Mensages = ['https://www.youtube.com/watch?v=qKp1f7Vn9dM', 'https://www.youtube.com/watch?v=pK060iUFWXg','https://www.youtube.com/watch?v=PEGEiC6Yny4', 'https://www.youtube.com/watch?v=_S7WEVLbQ-Y', 'https://www.youtube.com/watch?v=_mPd_SDAryQ', 'https://www.youtube.com/watch?v=nEt1bKGlCpM', 'https://www.youtube.com/watch?v=KTWOLOeX90c', 'https://www.youtube.com/watch?v=2Ax_EIb1zks',
  'https://www.youtube.com/watch?v=xd_ebCvnGqY', 'https://www.youtube.com/watch?v=j8Gs_rfhKrY', 'https://www.youtube.com/watch?v=JC0cVDtDPtE', 'https://www.youtube.com/watch?v=rWIUxwNRyRg', 'https://www.youtube.com/watch?v=MrD05HVGVIQ', 'https://www.youtube.com/watch?v=F_TV4vZRSE8', 'https://www.youtube.com/watch?v=ag1ayovdaxc', 'https://www.youtube.com/watch?v=nMbx8EurE0g', 'https://www.youtube.com/watch?v=LfgzPpmjM0M', 
  'https://www.youtube.com/watch?v=OPBECnDBiRQ', 
  'https://www.youtube.com/watch?v=D5uJOpItgNg', 'https://www.youtube.com/watch?v=5WXyCJ1w3Ks', 'https://www.youtube.com/watch?v=85ftfVUTzM4', 'https://www.youtube.com/watch?v=tOZNh8veU_Y', 'https://www.youtube.com/watch?v=HeQGcCtk4bc',
  'https://www.youtube.com/watch?v=Qskm9MTz2V4', 'https://www.youtube.com/watch?v=3rUrG_3pk6o', 'https://www.youtube.com/watch?v=w5jWSS1DVZQ', ''];
  var Aleatorio = Math.floor(Math.random() * (Mensages.length));
    message.channel.send(Mensages[Aleatorio])

 }
}