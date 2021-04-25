const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.ytkey);
const distube = require('distube');

module.exports = {
  name: "pause",
  alias: [],

execute (client, message, args){

  const queue = client.queue
  const voiceChannel = message.member.voice.channel
  const serverQueue = queue.get(message.guild.id)

  if(!voiceChannel) return message.channel.send('U are not on a vc to pause music')
  if(serverQueue && voiceChannel !== message.guild.me.voice.channel) return message.channel.send('U need to be on the same channel as me')


  serverQueue.playing
  if(serverQueue && serverQueue.playing){
    serverQueue.playing = false
    serverQueue.connection.dispatcher.pause()

    message.channel.send('the song were paused')
  }

 }
}
