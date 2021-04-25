  const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "mainkra",
  alias: [],

execute (client, message, args){
const mainkra = args.join(" ")

  var Mensages = ['https://i.pinimg.com/564x/78/2d/f8/782df84b6431dd78a782bedf53d01f86.jpg', 'https://www.gamedesigning.org/wp-content/uploads/2018/03/v66.jpg', 'https://pm1.narvii.com/6238/467a88fdd43eec9188a5122db341a909373abbef_hq.jpg', 'https://img.memecdn.com/yeah-minecraft-memes-aren-amp-039-t-cool-but-i-just-needed-to-caption-this-pic_o_7255822.jpg', 'https://lh3.googleusercontent.com/proxy/fhQM8sbRE-GOhXb-DkoyRYqVf9Ae93TyFZZBJSQTrZDZ9QDMKHH3QZzdf5HL3WvUAbl_WyKb_50WytzWJkEE1bmqewBPFfkWr_A6p5gdFz-o_kVOhKQ_mg' , 'https://i.pinimg.com/736x/5c/3d/9f/5c3d9f647018a9847f0f05c367fa897a.jpg', 'http://images7.memedroid.com/images/UPLOADED723/5fc941a852394.jpeg', 'https://i.ytimg.com/vi/8grdV6MhnJg/maxresdefault.jpg', 'http://pm1.narvii.com/6238/45f1d4a2704c331e8c6fd495334e87c34820d2de_00.jpg', 'https://i.chzbgr.com/full/9307453440/hCF6AB69C/funny-minecraft-meme-in-honor-of-the-games-10th-anniversary', 'https://lh3.googleusercontent.com/proxy/fyBPzsEUyXKZHoQH_cKTTMbOWcMzsX7BxJNGWrun-VSdEzEG-zk7aYfbgc-W4oPvNcVu2ZHs8LXNbqwQQ380Fq7N38wEasY6jkUMXh2byHEMskKYbiIBSsyOT1k', 'https://media1.tenor.com/images/9f72835dbf77d33c1f1af70b02130849/tenor.gif?itemid=16838644'];
  var Aleatorio = Math.floor(Math.random() * (Mensages.length));
    message.channel.send(Mensages[Aleatorio])
 }
}