const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.ytkey);
const distube = require('distube');
module.exports = {
  name: "play",
  alias: ["p"],

async execute (client, message, args){



const song = args.join(" ")

  const queue = client.queue
  const voiceChannel = message.member.voice.channel;
  const serverQueue = queue.get(message.guild.id)

  if(!voiceChannel) return message.channel.send('u are not on a voice channel')
  if(serverQueue && voiceChannel !== message.guild.me.voice.channelID) return message.channel.send('u need to be in the vc that i am on this moment')


  let guild = message.guild

  async function play(guild, song){
    const serverQueue = await queue.get(guild.id)
  

if(!song){
    await serverQueue.member(message.author.id).voice.channelID
    await queue.delete(guild.id);
    return;
  }
  const stream = ytdl(song.url, {
    filter: 'audioonly',
    highWaterMark: 1 << 25,
    quality: "highestaudio"
  })

const dispatcher = await serverQueue.connection.play(stream).on('finish', async () =>{
  serverQueue.songs.shift();

  await play(guild, serverQueue.songs[0])
})
.on('error', (error) => console.log(error))

dispatcher.setVolume(serverQueue.volume)

return message.channel.send(`reproducing now **${song.title}**`)
  }
async function handlevideo(video, playlist) {
  const serverQueue = await queue.get(guild.id);
  const song = {
    title: video.title,
    id: video.id,
    duration: video.duration,
    url: `https://www.youtube.com/watch?v=${video.id}`
  }
  if(serverQueue) {
  await serverQueue.songs.push(song)
  if(playlist) return;
    return mesage.channel.send(`song added to the playlist **${song.title}**`)
} else {
  const queueConstruct = {
    textChannel: message.channel,
    voiceChannel,
    connection: null,
    songs: [],
    playing: true,
    volume: 0.5
  }

  try {
    await queue.set(guild.id, queueConstruct)
    await queueConstruct.songs.push(song)

    const connection = await voiceChannel.join()
    queueConstruct.connection = connection

    await play(guild, queueConstruct.songs[0])
  } catch (error) {
  console.log(error)
  }
}
 }
  if(!args[0]) return message.channel.send('U need to write a song')
  let video;

  if(ytdl.validateURL(args[0])) {
    video = await youtube.getVideo(args[0])

   message.delete()

   return;
   } else {
   let song = args.join(" ")

   try {
     let videos = await youtube.searchVideos(song, 8)

     if(!videos.length) return message.channel.send('something went wrong')

     let index = 0


     const embed = new Discord.MessageEmbed()

     .setTitle('Songs founded')
     .setDescription(`${videos.map((video) => `**${++index}** - ${video.title}`).join('\n')}`)
     .setColor("BLUE")

     message.channel.send(embed)

     let optionSearch;

     try {
     optionSearch = await message.channel.awaitMessages((msg2) => msg2.content > 0 && msg2.content < 9 && message.author.id === msg2.author.id, {
       max: 1,
       time: 30000,
       errors: ['time']
     });
     } catch (error) {
       return message.channel.send('the time is up')
     }
   
   const videoIndex = parseInt(optionSearch.first().content, 9)

   video = await youtube.getVideoByID(videos[videoIndex - 1].id) 
   } catch (error) {
     return message.channel.send("no song were founded.")
   }
  }

 handlevideo(video, false)

 }
}
