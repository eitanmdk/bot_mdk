const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "meme eng",
  alias: [],

execute (client, message, args){

const memeseng = args.join(" ")

  var Mensages = ['https://i.pinimg.com/564x/0d/85/a6/0d85a66ec29f3f88bd05983c793a89b1.jpg', 'https://www.englishwithnick.de/wp-content/uploads/2015/03/CarryingShirt.jpg', 'https://lh3.googleusercontent.com/proxy/ugi262ydGLOzGDqj8hWoTsSkUKRWABPi-mkVtWOOB3-aurbSgFoznAuh6Hu_TMIfmQ_MXuwLHnAQXOeB2LpN3ihMhMapOOywrb7amjs4nR-4T9EfL8vXHdBvfg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS21LXUMb2UN9_xe4UersrG3fJPtnKSLnMybg&usqp=CAU', 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/26208032/original/8b543090906bc76cd2f4702426d4759368877cd7/create-5-extremely-funny-memes-for-you-in-english-or-spanish.jpg']
    var Aleatorio = Math.floor(Math.random() * (Mensages.length));
    message.channel.send(Mensages[Aleatorio])

 }
}
