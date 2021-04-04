////////constantes/////////
const Discord = require('discord.js');
const client = new Discord.Client();
const express = require ('express')
const http = require("http");
const app = express()
const Fs = require("fs");
const fs = require("fs");
let { readdirSync } = require('fs');
const ms = require("ms");
const bot = new Discord.Client()
const Enmap = require("enmap");
const config = require("./config.json");
let prefix = process.env.PREFIX;

////////handler//////

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {

  

  if(message.author.bot) return;

  if(!message.content.startsWith(prefix)) return;

  let usuario = message.mentions.members.first() || message.member; 
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
if(cmd){
cmd.execute(client, message, args)

}
})
////////////server/////////////

require('dotenv').config();
app.get('/', function(req, res){
  res.send('MDK BOT XDDDD')
})
let port = process.env.PORT || 3000;
app.listen(port)

require('dotenv').config()

//////////consola///////////


client.on('ready', () => {
  const array = [
  {
    name:'m!help for comms',
    type:'WATCHING'
  },
    {
    name:'coding',
    type:'PLAYING'
  },
  {
    name:'xd idk',
    type:'PLAYING'
  },
  {
    name:`to ${client.guilds.cache.size} servers`,
    type:'LISENTING'
  },
  {
    name:`to ${client.users.cache.size} users`,
    type:'WATCHING'
  },
  {
    name:'plis invite me',
    type:'STREAMING',
    url: 'https://twitch.tv/eitanmdk'
  }
  ]
  setInterval(() => {
    function presence() {
      client.user.setPresence({
        status: 'dnd',
        activity: array[Math.floor(Math.random() * array.length)]  
});
    }

    presence();
  }, 7000)

console.log('si estoy online !!!!')
})
/////////economia///////////////
client.on("message", async (message) => {
    if (message.content.startsWith(prefix)) {
        // Command
        var args = message.content.substr(prefix.length)
            .toLowerCase()
            .split(" ");
        if (args[0] == "start") {

            // Action
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));

            if (UserJSON[message.author.id]) {
                let WarningEmbed = new Discord.MessageEmbed();
                WarningEmbed.setTitle("**ERROR**");
                WarningEmbed.setDescription("You already started");
                WarningEmbed.setColor('#5DBE29')
                message.channel.send(WarningEmbed);
                return;
            }

            UserJSON[message.author.id] = {
                bal: 0,
                lastclaim: 0,
                lastwork: 0,
                workers: 0,
                nitros: 0,
                eitanmdks: 0,
                commputer: 0,
            }
            Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("You have joined the economy! type m!economy to get started");
            SuccessEmbed.setColor('#5DBE29')
            message.channel.send(SuccessEmbed);
            return;
        }
        if (args[0] == "daily") {
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));
            if (Math.floor(new Date().getTime() - UserJSON[message.author.id].lastclaim) / (1000 * 60 * 60 * 24) < 1) {
                let WarningEmbed = new Discord.MessageEmbed()
                WarningEmbed.setTitle("**ERROR**");
                WarningEmbed.setDescription("You have claimed today already for <:mdkc:788936738634072074>");
                WarningEmbed.setColor('#5DBE29')
                message.channel.send(WarningEmbed);
                return;
            }
            UserJSON[message.author.id].bal += 500;
            UserJSON[message.author.id].lastclaim = new Date().getTime();
            Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));
            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("You have claimed a daily reward of 500 Mdk coins <:mdkc:788936738634072074>!");
            SuccessEmbed.setColor('#5DBE29')
            message.channel.send(SuccessEmbed);
            return;
        }
        if (args[0] == "pay") {
            // Action Here
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));
            let Money = args[1];

            /* ERROR CHECKS */
            if (!Money) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an amount to give Mdk coins <:mdkc:788936738634072074>.");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You have not started the game yet.");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }
            if (isNaN(Money)) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify a number <:mdkc:788936738634072074>");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }
            if (UserJSON[message.author.id].bal < Money) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You do not have enough money <:mdkc:788936738634072074>");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }
            if (Money.indexOf(".") != -1 || Money.indexOf("-") != -1 || Money == 0) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an integer value greater than 0 to give <:mdkc:788936738634072074>");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }

            let Mentioned = message.mentions.members.first();
            if (!Mentioned) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please mention a user to give <:mdkc:788936738634072074>");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }
            if (!UserJSON[Mentioned.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("That person does not play the game to give <:mdkc:788936738634072074>.");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }

            UserJSON[message.author.id].bal -= parseInt(Money);
            UserJSON[Mentioned.id].bal += parseInt(Money);

            Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("You have given " + Money + " Mdk coins <:mdkc:788936738634072074> to " + Mentioned.user.username);
            message.channel.send(SuccessEmbed);
        }
        if (args[0] == "inv") {
            // Action Here
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You must be playing the game.");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }
            let mentioned = message.mentions.members.first();
            if (mentioned) {
                if (!UserJSON[mentioned.id]) {
                    let ErrorEmbed = new Discord.MessageEmbed();
                    ErrorEmbed.setTitle("**ERROR**");
                    ErrorEmbed.setDescription("That person is not playing the game.");
                    ErrorEmbed.setColor('#5DBE29')
                    message.channel.send(ErrorEmbed);
                    return;
                }
                let SuccessEmbed = new Discord.MessageEmbed();
                SuccessEmbed.setTitle("**SUCCESS**");
                SuccessEmbed.addField("Balance <:mdkc:788936738634072074>", UserJSON
                [mentioned.id].eitanmdk);
                SuccessEmbed.addField("Balance <:mdkc:788936738634072074>", UserJSON
                [mentioned.id].computer);
                SuccessEmbed.addField("Balance <:mdkc:788936738634072074>", UserJSON
                [mentioned.id].nitro);
                SuccessEmbed.setColor('#5DBE29')
                message.channel.send(SuccessEmbed);
                return;
            } else {
                let SuccessEmbed = new Discord.MessageEmbed();
                SuccessEmbed.setTitle("**SUCCESS**");
                SuccessEmbed.addField("eitanmdks <:mdkc:788936738634072074>", UserJSON
                [message.author.id].eitanmdks);
                SuccessEmbed.addField("computers <:computer:797877910354264094>", UserJSON
                [message.author.id].computers);
                SuccessEmbed.addField("nitros <:nitro:797876176265281589>", UserJSON
                [message.author.id].nitros);          SuccessEmbed.addField("workers <:worker:797871381555576832>", UserJSON
                [message.author.id].workers);
                SuccessEmbed.setColor('#5DBE29')
                message.channel.send(SuccessEmbed);
                return;
            }
        }

        if (args[0] == "bal") {
            // Action Here
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You must be playing the game.");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }
            let mentioned = message.mentions.members.first();
            if (mentioned) {
                if (!UserJSON[mentioned.id]) {
                    let ErrorEmbed = new Discord.MessageEmbed();
                    ErrorEmbed.setTitle("**ERROR**");
                    ErrorEmbed.setDescription("That person is not playing the game.");
                    ErrorEmbed.setColor('#5DBE29')
                    message.channel.send(ErrorEmbed);
                    return;
                }
                let SuccessEmbed = new Discord.MessageEmbed();
                SuccessEmbed.setTitle("**SUCCESS**");
                SuccessEmbed.addField("Balance <:mdkc:788936738634072074>", UserJSON
                [mentioned.id].bal);
                SuccessEmbed.setColor('#5DBE29')
                message.channel.send(SuccessEmbed);
                return;
            } else {
                let SuccessEmbed = new Discord.MessageEmbed();
                SuccessEmbed.setTitle("**SUCCESS**");
                SuccessEmbed.addField("Balance <:mdkc:788936738634072074>", UserJSON[message.author.id].bal);
                SuccessEmbed.setColor('#5DBE29')
                message.channel.send(SuccessEmbed);
                return;
            }
        }
        if (args[0] == "buy") {
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You must be playing the game.<:mdkc:788936738634072074>");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }

            let item = args[1];
            let amount = args[2];

            if (!item) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an item.");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }
            if (!amount) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an amount");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }
            if (isNaN(amount)) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify a number");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }
            if (amount == 0 || amount.indexOf("-") != -1 || amount.indexOf(".") != -1) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an integer value greater than 0.");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }

            switch (item) {
                case "worker":
                  case 'nitro':
                   case 'eitanmdk':
                    case 'computer':
                    if (10 * parseInt(amount) > UserJSON[message.author.id].bal) {
                      
                      
                        let ErrorEmbed = new Discord.MessageEmbed();
                        ErrorEmbed.setTitle("**ERROR**");
                        ErrorEmbed.setDescription("You do not have enough money <:mdkc:788936738634072074>");
                        ErrorEmbed.setColor('#5DBE29')
                        message.channel.send(ErrorEmbed);
                        
                    }
                    
                    
                    
                    

                    UserJSON[message.author.id].workers += parseInt(amount) * 20;
                    UserJSON[message.author.id].eitanmdks += parseInt(amount) * 100000000;
                    UserJSON[message.author.id].bal -= parseInt(amount) * 10;
                    Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

                    let SuccessEmbed = new Discord.MessageEmbed();
                    SuccessEmbed.setTitle("**SUCCESS**");
                    SuccessEmbed.setDescription(`You have bought ${amount} ${item}. <:mdkc:788936738634072074>`);
                    SuccessEmbed.setColor('#5DBE29')
                    message.channel.send(SuccessEmbed);
                    break;
                default:
                    let ErrorEmbed = new Discord.MessageEmbed();
                    ErrorEmbed.setTitle("**ERROR**");
                    ErrorEmbed.setDescription("The item you are trying to buy does not exist. <:mdkc:788936738634072074>");
                    ErrorEmbed.setColor('#5DBE29')
                    message.channel.send(ErrorEmbed);
                    return;
            }
        }
        
        if (args[0] == "work") {
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You must be playing the game.");
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }

            let deltaTime = Math.floor((new Date().getTime() - UserJSON[message.author.id].lastwork) / (1000 * 60));
            if (deltaTime < 30) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription(`You can work in ${30 - deltaTime} minutes <:mdkc:788936738634072074>.`);
                ErrorEmbed.setColor('#5DBE29')
                message.channel.send(ErrorEmbed);
                return;
            }

            UserJSON[message.author.id].bal += (UserJSON[message.author.id].workers + 1) * 2;
            UserJSON[message.author.id].lastwork = new Date().getTime();
            Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription(`You have earned ${(UserJSON[message.author.id].workers + 1) * 2} Mdk Coins 
            <:mdkc:788936738634072074>`);
            SuccessEmbed.setColor('#5DBE29')
            message.channel.send(SuccessEmbed);
        }
        if (args[0] == "rich") {
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));
            var Sorted = Object.entries(UserJSON).sort((a, b) => b[1].bal - a[1].bal);
            if (Sorted.length > 10) Sorted = Sorted.slice(0, 10);

            var LBString = "";
            Sorted.forEach(user => {
                LBString += `${client.users.cache.find(u => u.id == user[0])} - ${user[1].bal}\n`;
            });
            var LBEmbed = new Discord.MessageEmbed()
                .setTitle("**RICHEST USERS**")
                .setColor('#5DBE29')
                .setDescription(LBString);
            message.channel.send(LBEmbed);
        }
    }
})
///////////comandos////////////
client.on('message', msg => {
  if(msg.content === prefix + 'bruh') {
    msg.reply('https://i.ytimg.com/vi/ZF57zsOWdB0/maxresdefault.jpg')
  }
});
client.on('message', msg => {
  if(msg.content === prefix + 'vote') {
    msg.reply('\n**VOTE**\nSAM BOT LIST:https://samlist.glitch.me/bots/like/769400040962916382\nTop Bots:\nMAD KING:\nDISCTOP')
  }
});
client.on('message', msg => {
  if(msg.content === 'join heist') {
    msg.react('😠')
  }
});



client.on('message', msg => {
  if (msg.content === prefix + 'bailar') {
    msg.reply('<a:vailado:783076196664737803><a:vailado:783076196664737803> ');
  }
});
client.on('message', msg => {
  if (msg.content === prefix + 'german') {
    msg.reply('TU MAMA EN TANGA');
  }
});
client.on('message', msg => {
  if (msg.content === prefix + 'germanfrase') {
    
    msg.reply('TU MAMA');
    
  }
});
client.on('message', msg => {
  if(msg.content ===
  prefix + 'funado')
  msg.reply('eitan esta funado por eso no hace updates porque le dijo a su hermano puto 1/03/21')
})

client.on('message', msg => {
  if(msg.content === prefix + 'dormir') {
  msg.reply('wenas noches ;)')
  }
});
client.on('message', msg => {
  if(msg.content === prefix + 'dato')
  msg.reply('<a:vailado:783076196664737803>eitan es un noob en los shooters de roblox<a:vailado:783076196664737803>')
});
client.on('message', msg => {
  if(msg.content === prefix + 'topsecret')
  msg.reply('en la actualicacion 3.0 se va a poder comprar mas cosas en la seccion de economia <:mdkc:788936738634072074><a:vailado:783076196664737803>')
});
client.on('message', msg => {
  if(msg.content === prefix + 'tu mama')
  msg.reply('EN TANGA XDDDDD')
});
client.on('message', msg => {
  if(msg.content === prefix + 'UwU')
  msg.reply('UwU, OwO, AwA')
});
client.on('message', msg => {
  if(msg.content === prefix + 'jaja')
  msg.reply('https://abcespblog.files.wordpress.com/2019/10/c3adndice.png')
});
/////////////randoms///////////
client.on('message', message => {
  var Mensages = ['https://www.eluniversal.com.mx/sites/default/files/2020/08/30/memes.jpeg', 'https://de10.com.mx/sites/default/files/styles/galeria_photo_760x508/public/2020/11/06/16_memes_buen_fin.jpg?itok=g_Ly_gqf', 'https://offloadmedia.feverup.com/barcelonasecreta.com/wp-content/uploads/2020/04/09104747/memes.jpg', 'https://offloadmedia.feverup.com/barcelonasecreta.com/wp-content/uploads/2020/04/09104747/memes.jpg', 'https://www.fcbarcelonanoticias.com/uploads/s1/12/00/52/0/meme-de-sergio-ramos.jpeg', 'https://i.blogs.es/0ec27f/memess/1366_2000.jpg', 'https://i1.wp.com/www.materiagris.es/wp-content/uploads/2018/10/memes-comunicacion.jpg?resize=700%2C321&ssl=1', 'https://de10.com.mx/sites/default/files/styles/galeria_photo_760x508/public/2020/11/06/5_memes_buen_fin.jpg?itok=bA71XxQu', 'https://i.pinimg.com/236x/1d/c5/bf/1dc5bf2c730036567aecd29394402ab4.jpg', 'https://i.pinimg.com/736x/a8/4f/a4/a84fa4c0ee8384b46ac5120ce8584401.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_2frJhlo4gvQAoXXm8wBiGrFpBevvgHzWjA&usqp=CAU', 'https://elbocon.pe/resizer/SdPY21IdQQFnNqxrid9omQbZSfo=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/GT4CNSAFUVF63BNXFA6VCFGSGM.jpg', 'https://integralatampost.s3.amazonaws.com/uploads/article/picture/22868/2020-06-30_15_562020-06-30_15_4020200701_Los-mejores-memes-para-el-inicio-de-mes.jpg', 'https://i.blogs.es/a9260e/destacada/450_1000.jpg', 'https://www.isdi.education/sites/default/files/styles/noticia_basico/public/noticias/meme_marketing_0.png?itok=aU4_RxRJ', 'https://www.fundeu.es/wp-content/uploads/2013/02/RecMemes.jpg', 'https://spoiler.bolavip.com/__export/1600954443613/sites/bolavip/img/2020/09/24/memes_anne_with_an_e_serie_crop1600954442906.jpg_554688468.jpg', 'https://images.daznservices.com/di/library/GOAL/7b/f2/memes-bartomeu-dimision_1q6opxecgadhj1cv1l1nkttqe6.jpeg?t=1873880933&quality=100', 'https://i.ytimg.com/vi/gz0CYLoE6_o/maxresdefault.jpg', 'https://i.ytimg.com/vi/gsS21876yEk/maxresdefault.jpg', 'https://i.ytimg.com/vi/mxyLncDe9pA/maxresdefault.jpg', 'https://i.ytimg.com/vi/_01l_NMVTT0/maxresdefault.jpg', 'https://i.ytimg.com/vi/x1gqTWsVcJE/maxresdefault.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnlFhZd1mG6KYXhoFOBZ3N-JcZDzNLBvV2PA&usqp=CAU', 'https://imagenes.milenio.com/-Vnmwi5lBgeD-WfYH4n0lyz6nEI=/958x596/https://www.milenio.com/uploads/media/2020/11/16/un-meme-sobre-disney-plus.jpg', 'https://www.fundaciontelefonica.com.ar/wp-content/uploads/2019/05/abuelita-viendo-su-computadora-meme-1.png', 'https://www.getcleartouch.com/wp-content/uploads/meme-to-go-back-to-school.jpg', 'https://images.clarin.com/2018/04/29/don-ramon-siempre-presente-en___r1FfL18pf_720x0__1.jpg', 'https://www.lavanguardia.com/r/GODO/LV/p7/WebSite/2020/07/03/Recortada/img_tayala_20200703-125951_imagenes_lv_terceros_meme-357-kpKE-U4820612666872HE-992x558@LaVanguardia-Web.jpg', 'https://cr00.epimg.net/radio/imagenes/2020/10/21/tendencias/1603302012_839235_1603303414_noticia_normal.jpg', 'https://www.elsoldemexico.com.mx/doble-via/virales/5p5gg8-meme-josejose2.jpg/ALTERNATES/LANDSCAPE_400/meme-josejose2.jpg', 'https://i.ytimg.com/vi/2AwRvVxXez0/maxresdefault.jpg', 'https://pbs.twimg.com/media/DR7ZBC_X4AArYz7.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGj-2JjR4wBElH4nWb4LpB0Crb0z6sQVFibg&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLyXLNj_tu2meh8af924uQ00zpHTD5Mdzn8g&usqp=CAU', 'https://i.ytimg.com/vi/gM8f_1grmqo/maxresdefault.jpg', 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/10/08/16021428266524.jpg', 'https://i.pinimg.com/originals/05/18/12/051812216879683e350f0392d8c0b4b0.jpg', 'https://animal.mx/wp-content/uploads/2020/09/sticker-among-us.jpg', 'https://images.clarin.com/2020/09/10/among-us-los-memes-del___Fnepwx9g7_720x0__1.jpg', 'https://i1.wp.com/erizos.mx/wp-content/uploads/2020/09/photo_2020-09-10-13.31.58.jpeg?fit=1200%2C630&ssl=1', 'https://i.pinimg.com/564x/d5/18/d5/d518d52fee01e7efaa7c541ab15f5f60.jpg', 'https://i.pinimg.com/originals/7e/70/7f/7e707fd6fbc2d692c9966557483016ff.png', 'https://image.winudf.com/v2/image/Y29tLmx1emFwcHMubWVtZWNoaXN0b3Nvc19zY3JlZW5fMTNfamF2cjl1dzA/screen-13.jpg?fakeurl=1&type=.jpg', 'https://assets.metrolatam.com/co/2015/05/27/captura-de-pantalla-2015-05-26-a-las-17-30-43-1600x800.jpg', 'https://static.paraloscuriosos.com/img/articles/26567/832x416/5bc988821cf15_2.jpg', 'https://www.pintamania.com/fr-730x430-data/fotos/meme-gracioso-meme.jpg', 'https://media.ambito.com/adjuntos/239/imagenes/037/508/0037508225.jpg?0000-00-00-00-00-00', 'https://www.meddigitalmkt.com/wp-content/uploads/2020/04/memes-1-1024x814.jpg', 'https://i0.wp.com/memeschistosos.net/wp-content/uploads/2017/03/nuevas-imagenes-y-memes-chistosos-2017-39.png?w=730', 'https://informacionimagenes.net/wp-content/uploads/2020/02/3a325a537d5334a505f96b4587360d2c.jpg', 'https://img.scoop.it/EOU2hLLELJuERMVdkgIZwzl72eJkfbmt4t8yenImKBVvK0kTmF0xjctABnaLJIm9', 'https://lh3.googleusercontent.com/IXVhWQLf-IYgKAHykh9pWzmKF_OOObE5g-3gk5IrCocGB2tHtK_Gtd6PlUCFfXnbfv0=h750', 'https://i0.wp.com/estopalwasap.com/wp-content/uploads/2019/01/memes-chistosos-09.jpg?w=730', 'https://static.paraloscuriosos.com/img/articles/26702/356x178/5bd2b836c3f39_la-mejor-dosis-de-memes-de-todos-los-tiempos.jpg', 'https://okdiario.com/img/2019/02/08/los-mejores-memes-de-san-valentin-2019-oficina-620x349.jpg', 'https://memes-graciosos.com/images/2019/03/06/memes-chistosos.md.png', 'https://i0.wp.com/memeschistosos.net/wp-content/uploads/2017/03/nuevas-imagenes-y-memes-chistosos-2017-40.png?w=730', 'https://i.ytimg.com/vi/U00Vq91vXyU/maxresdefault.jpg', 'https://i.pinimg.com/originals/96/aa/cf/96aacf3822330a5320e57b500a3e6b1d.jpg', 'https://www.memeschistosos.com.mx/wp-content/uploads/2017/07/Memes-Chistosos-para-Mi-Novio-5-300x300.jpg', 'https://i.pinimg.com/236x/99/70/78/9970781473af6f5dafa81e08ea2ed33b.jpg', 'https://i.pinimg.com/originals/65/81/98/65819866889901b6e3d42d80aa5bf63f.jpg', 'https://i.pinimg.com/474x/df/78/75/df7875fa004b34c722a23b94266c56bc.jpg', 'https://i.pinimg.com/originals/21/4f/19/214f19d7cd6571853e815483519b5f3e.jpg', 'https://i.pinimg.com/474x/2e/6b/21/2e6b21dd9d2e6d20139f3371ce5270d6--meme-humor-funny-posts.jpg', 'https://i.pinimg.com/736x/b1/2e/4c/b12e4c17832bf7c90cb5324e664a78f6.jpg', 'https://i.pinimg.com/474x/2c/61/26/2c612607457b070cd4ddec6d958d1ede.jpg', 'https://i.pinimg.com/originals/6b/14/77/6b1477f4abb814455d82614036e86836.jpg', 'https://i.pinimg.com/474x/89/c3/0f/89c30f68483ff378d740cec5f10cefbf.jpg', 'https://i.pinimg.com/564x/b9/2b/51/b92b51fcb44a1a566c8a27237939987e.jpg', 'https://i.pinimg.com/236x/a2/93/38/a293388b176cd68b6a62f50d3310f93c--kermit-the-frog-mexican-humor.jpg', 'https://i.pinimg.com/236x/44/c8/aa/44c8aa4a6e9de0138e7f7878b5f760f3--gifs-graciosos-humor-memes.jpg', 'https://i.pinimg.com/736x/2d/d0/f0/2dd0f0b1cc6c6129499ca60ab27c99ca.jpg', 'https://i.pinimg.com/236x/d4/ba/ce/d4bacee7f89fd642a2b21298a7189510--humor-cristiano-hilarious.jpg', 'https://eyezen.es/wp-content/uploads/2018/10/llama.jpg', 'https://www.lavanguardia.com/r/GODO/LV/p7/WebSite/2020/08/14/Recortada/img_egago_20200814-234049_imagenes_lv_otras_fuentes_meme5-kOPD-U482813945290hIF-992x558@LaVanguardia-Web.JPG', 'https://image.winudf.com/v2/image/Y29tLmdseWVtYXBwcy5tZW1lc2RpdmVydGlkb3Nfc2NyZWVuXzBfZ2hjcWE0cjA/screen-0.jpg?fakeurl=1&type=.jpg', 'https://www.webespacio.com/wp-content/uploads/2014/05/homero-mama.jpg', 'https://www.informador.mx/__export/1579807757984/sites/elinformador/img/2020/01/23/coronavirus_tepa.jpg_1970638775.jpg', 'https://e.rpp-noticias.io/xlarge/2016/06/14/168006foto1jpg.jpg', 'https://i.pinimg.com/originals/ba/15/ac/ba15acc974671bfd8ba5997900e07ead.png', 'https://www.futbolred.com/files/article_multimedia_gallery/files/crop/uploads/2020/05/16/5ec006b7a760e.r_1589642950163.0-55-718-533.jpeg', 'https://i.pinimg.com/originals/a7/64/47/a76447595797b04c7eae4427d617f4c6.png', 'https://www.eluniversal.com.mx/sites/default/files/u40162/meme_wey_ya_8.jpg', 'https://fotografias.antena3.com/clipping/cmsimages02/2020/06/24/A3A5B40D-3469-49B5-B9BB-0325A609FCD8/57.jpg', 'https://i.pinimg.com/564x/f0/92/3c/f0923ce2486e55e1089efc64ab5ab388.jpg', 'https://blog.hubspot.es/hubfs/Memesmasgraciosos1.jpeg', 'https://i1.wp.com/www.sopitas.com/wp-content/uploads/2018/10/memes-clasico-espa%C3%B1ol-barcelona-real-madrid-2018-triunfo-la-liga-10.jpg', 'https://www.eluniversal.com.mx/sites/default/files/2020/03/01/memes_8.jpg', 'https://i.pinimg.com/564x/2c/31/1c/2c311c344ec705bddca1c62ff01f7799.jpg', 'https://lacalletv.com/wp-content/uploads/2019/09/meme-chuck-norris.jpg', 'https://i.pinimg.com/originals/65/9a/f5/659af5c84fc636a87e2d9b91ee61cc68.jpg', 'https://k62.kn3.net/taringa/3/E/D/2/B/2/ChristianDennis/550x398_168.jpg', 'https://i.redd.it/dc0fb50qten31.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNmS9N1TWKgi1nF2gWcDz5dnqlWd0QtOWWBA&usqp=CAU', 'https://lh3.googleusercontent.com/proxy/oKhMF93mLGOnE4CGwW4aofS_Ys5HVFysLPNIqmGUQ3bAm4OUI2IFUJfSiJbQFT-8Bc-y0QiF1yWs9VJRvnL6X6xEOkCtYrKhLtCpkititJP2cXNaUJ-dDb0', 'https://futbolhoy.co/wp-content/uploads/2018/10/MMD_1054429_d18fcc4c837949cca4cd072c6332e7c2_futbol_coutinho_adelanta_a_los_cules.jpg', 'https://i.pinimg.com/564x/f0/92/3c/f0923ce2486e55e1089efc64ab5ab388.jpg', 'https://www.winsports.co/sites/default/files/styles/slick_fullscreen/public/images/galeries/mira-los-mejores-memes-que-dejaron-el-cl%C3%A1sico-espa%C3%B1ol-entre-real-madrid-y-barcelona-18.png?itok=Gl2XLan4', 'https://www.tuexperto.com/wp-content/uploads/2019/10/meme-halloween-espanol-2.jpg.webp', 'https://hobbitmemes.com/wp-content/uploads/2020/11/download-1.jpg', 'https://i.ytimg.com/vi/nAvHQVOHwwE/maxresdefault.jpg', 'https://www.winsports.co/sites/default/files/styles/slick_fullscreen/public/images/galeries/mira-los-mejores-memes-que-dejaron-el-cl%C3%A1sico-espa%C3%B1ol-entre-real-madrid-y-barcelona-15.png?itok=PKiyUonw', 'https://www.generadormemes.com/media/created/xu0x5eo5rg4dmsm543gwx4ibvdpae4zhua2zqap5pcrhucm1grts48773v9b4ysp.jpg.pagespeed.ic.imagenes-memes-fotos-frases-graciosas-chistosas-divertidas-risa-chida-espa%C3%B1ol-whatsapp-facebook.jpg', 'https://prod.media.libero.pe/342x192/libero/imagen/2020/10/23/noticia-1603505188-barcelona-madrid-memes5.jpg', 'https://media.tycsports.com/files/2020/10/24/129397/meme_w862.jpg', 'https://pm1.narvii.com/7043/3d21a9fd95fa2f123c0312a6d397ea04489b5f77r1-720-472v2_uhq.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKs-xUUYRKG7KU5D7y7ORs2LQkQ4WOrxAsFA&usqp=CAU', 'https://pics.me.me/thumb_memes-graciosos-en-espa%C3%B1ol-%E2%80%93-mejores-memes-graciosos-en-espa%C3%B1ol-72507429.png', 'https://images.mediotiempo.com/SPFwKX5wPbVdwSkxCTJYN8PgirU=/0x530/uploads/media/2018/05/06/mejores-memes-clasico-espanol-barcelona-10.jpg', 'https://aprendamoses.files.wordpress.com/2018/09/30127716_2043432139232879_1677984299085908133_n.jpg?w=723', 'https://www.generadormemes.com/media/created/x0btqnr9b6wvcn6cifdnod53ayhl0q0z6scc2pgleh0fxjey2y5r0r56npvlumam.jpg.pagespeed.ic.imagenes-memes-fotos-frases-graciosas-chistosas-divertidas-risa-chida-espa%C3%B1ol-whatsapp-facebook.jpg', 'https://64.media.tumblr.com/4298bb322a2bd1615969ce456ec8b5a3/6867f26cab00f6fa-94/s500x750/65ffc61e07e3a380e88c983539b7e95be12ae1ec.jpg', 'https://images.mediotiempo.com/YXtg-1h6gJoxS8HMkegSRG8e91o=/0x530/uploads/media/2018/05/06/mejores-memes-clasico-espanol-barcelona-5.jpg', 'https://pics.onsizzle.com/iino-mames-esen-serio-memes-para-whatsapp-%E2%80%93-los-mejores-53135484.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJzH1bU5tYu5Y4c2nDFBCFRNeXKNtlxmEjIg&usqp=CAU', 'https://i.pinimg.com/originals/da/2a/69/da2a6950ac7ba3b331434f45407dda1a.jpg', 'https://3.bp.blogspot.com/-8zVO4JdV-ow/XIyPy5ndugI/AAAAAAAAAi0/kHWBwo7l1SMbAXog_KfSoHk2uNXHld-ZQCK4BGAYYCw/s640/FB_IMG_15508049349105222-723242.jpg', 'https://informacionimagenes.net/wp-content/uploads/2018/03/nuevas-imagenes-y-memes-chistosos-2017-25.png', 'https://www.memeschistosos.com.mx/wp-content/uploads/2017/07/memes-chistosos-de-perros-24-295x300.jpg', 'https://i.pinimg.com/564x/55/72/58/5572580ecc461e149aaea18489b21930.jpg', 'https://i.pinimg.com/originals/56/ef/fc/56effc11cc56018ba268db9dcb90bc25.jpg', 'https://www.animemes.org/images/meme/es/anime-meme-mU0mnlKl2e.jpg', 'https://memeschistosos.net/wp-content/uploads/2015/06/memesgraciososparawhatsapp2.jpg', 'https://i.pinimg.com/originals/0e/08/36/0e083629c178334b8c5e2f39f527ec4c.jpg', 'https://play-lh.googleusercontent.com/fZxc_9w-5wmDaCT4Xn4QctgT9HmPL4VSCEKRowrHFUk_j9Czpzp_2sgoNLBclDjYiaQ=w412-h220-rw', 'https://i.pinimg.com/474x/df/78/75/df7875fa004b34c722a23b94266c56bc.jpg'];
  var Aleatorio = Math.floor(Math.random() * (Mensages.length));
  if (message.content.startsWith(prefix + 'meme esp')) {
    message.channel.send(Mensages[Aleatorio]);
  }
});
client.on('message', message => {
  var Mensages = ['https://i.pinimg.com/564x/0d/85/a6/0d85a66ec29f3f88bd05983c793a89b1.jpg', 'https://www.englishwithnick.de/wp-content/uploads/2015/03/CarryingShirt.jpg', 'https://lh3.googleusercontent.com/proxy/ugi262ydGLOzGDqj8hWoTsSkUKRWABPi-mkVtWOOB3-aurbSgFoznAuh6Hu_TMIfmQ_MXuwLHnAQXOeB2LpN3ihMhMapOOywrb7amjs4nR-4T9EfL8vXHdBvfg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS21LXUMb2UN9_xe4UersrG3fJPtnKSLnMybg&usqp=CAU', 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/26208032/original/8b543090906bc76cd2f4702426d4759368877cd7/create-5-extremely-funny-memes-for-you-in-english-or-spanish.jpg']
    var Aleatorio = Math.floor(Math.random() * (Mensages.length));
  if (message.content.startsWith(prefix + 'meme eng')) {
    message.channel.send(Mensages[Aleatorio]);
  }
});
client.on('message', message => {
  var Mensages = ['https://www.youtube.com/watch?v=qKp1f7Vn9dM', 'https://www.youtube.com/watch?v=pK060iUFWXg','https://www.youtube.com/watch?v=PEGEiC6Yny4', 'https://www.youtube.com/watch?v=_S7WEVLbQ-Y', 'https://www.youtube.com/watch?v=_mPd_SDAryQ', 'https://www.youtube.com/watch?v=nEt1bKGlCpM', 'https://www.youtube.com/watch?v=KTWOLOeX90c', 'https://www.youtube.com/watch?v=2Ax_EIb1zks',
  'https://www.youtube.com/watch?v=xd_ebCvnGqY', 'https://www.youtube.com/watch?v=j8Gs_rfhKrY', 'https://www.youtube.com/watch?v=JC0cVDtDPtE', 'https://www.youtube.com/watch?v=rWIUxwNRyRg', 'https://www.youtube.com/watch?v=MrD05HVGVIQ', 'https://www.youtube.com/watch?v=F_TV4vZRSE8', 'https://www.youtube.com/watch?v=ag1ayovdaxc', 'https://www.youtube.com/watch?v=nMbx8EurE0g', 'https://www.youtube.com/watch?v=LfgzPpmjM0M', 
  'https://www.youtube.com/watch?v=OPBECnDBiRQ', 
  'https://www.youtube.com/watch?v=D5uJOpItgNg', 'https://www.youtube.com/watch?v=5WXyCJ1w3Ks', 'https://www.youtube.com/watch?v=85ftfVUTzM4', 'https://www.youtube.com/watch?v=tOZNh8veU_Y', 'https://www.youtube.com/watch?v=HeQGcCtk4bc',
  'https://www.youtube.com/watch?v=Qskm9MTz2V4', 'https://www.youtube.com/watch?v=3rUrG_3pk6o', 'https://www.youtube.com/watch?v=w5jWSS1DVZQ', ''];
  var Aleatorio = Math.floor(Math.random() * (Mensages.length));
  if (message.content.startsWith(prefix + 'music')) {
    message.channel.send(Mensages[Aleatorio]);
  }
});
client.on('message', message => {
  var Mensages = ['https://i.pinimg.com/564x/78/2d/f8/782df84b6431dd78a782bedf53d01f86.jpg', 'https://www.gamedesigning.org/wp-content/uploads/2018/03/v66.jpg', 'https://pm1.narvii.com/6238/467a88fdd43eec9188a5122db341a909373abbef_hq.jpg', 'https://img.memecdn.com/yeah-minecraft-memes-aren-amp-039-t-cool-but-i-just-needed-to-caption-this-pic_o_7255822.jpg', 'https://lh3.googleusercontent.com/proxy/fhQM8sbRE-GOhXb-DkoyRYqVf9Ae93TyFZZBJSQTrZDZ9QDMKHH3QZzdf5HL3WvUAbl_WyKb_50WytzWJkEE1bmqewBPFfkWr_A6p5gdFz-o_kVOhKQ_mg' , 'https://i.pinimg.com/736x/5c/3d/9f/5c3d9f647018a9847f0f05c367fa897a.jpg', 'http://images7.memedroid.com/images/UPLOADED723/5fc941a852394.jpeg', 'https://i.ytimg.com/vi/8grdV6MhnJg/maxresdefault.jpg', 'http://pm1.narvii.com/6238/45f1d4a2704c331e8c6fd495334e87c34820d2de_00.jpg', 'https://i.chzbgr.com/full/9307453440/hCF6AB69C/funny-minecraft-meme-in-honor-of-the-games-10th-anniversary', 'https://lh3.googleusercontent.com/proxy/fyBPzsEUyXKZHoQH_cKTTMbOWcMzsX7BxJNGWrun-VSdEzEG-zk7aYfbgc-W4oPvNcVu2ZHs8LXNbqwQQ380Fq7N38wEasY6jkUMXh2byHEMskKYbiIBSsyOT1k', 'https://media1.tenor.com/images/9f72835dbf77d33c1f1af70b02130849/tenor.gif?itemid=16838644'];
  var Aleatorio = Math.floor(Math.random() * (Mensages.length));
  if (message.content.startsWith(prefix + 'mainkra')) {
    message.channel.send(Mensages[Aleatorio]);
  }
});
//////////////////embeds//////////////////

client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#FF8B00')
    .setThumbnail('https://media.giphy.com/media/39CgKFYbkxoId4P6Tt/giphy.gif')
    .setTimestamp()
    .setTitle('COMMANDS OF FUN')
    .addField('meme esp', 'With m!meme says a random meme on spanish')
    .addField('meme eng', 'With m!meme says a random meme on english')
    .addField('mainkra', 'With m!mainkra says a minecraft random meme')
    .addField(`rps`, `Play rock paper scissors`)
  if (msg.content.startsWith(prefix + 'fun')) {
    msg.reply(embed)
  }
});
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#FF8B00')
    .setThumbnail('https://media.giphy.com/media/39CgKFYbkxoId4P6Tt/giphy.gif')
    .setTimestamp()
    .setTitle('RANDOM COMMANDS')
    .addField('dormir', 'with m!dormir says wenas noches')
    .addField('badface', 'with m!badface says a face of a a weird man xD')
    .addField('crow', 'with m!crow says the meme of the crow')
    .addField('tu mama', 'with m!tu mama says jajajajajajajaja')
    .addField('maik wasowski', 'with m!maik wasowski says the meme of mike wasowski')
    .addField('noob', 'with m!noob says the roblox noob')
    if (msg.content.startsWith(prefix + 'random')) {
    msg.reply(embed)
  }
});
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#FF8B00')
    .setTimestamp()
    .setTitle('YOUR AVATAR')
    .setImage(msg.author.displayAvatarURL())
    if (msg.content.startsWith(prefix + 'av')) {
    msg.reply(embed)
  }
});
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#00FF78')
    .setThumbnail('https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif')
    .setTimestamp()
    .setTitle('COMMANDS OF ECONOMY')
    .addField('start', 'm!start starts the economy cathegory')
    .addField('work', 'm!work is work for some coins **(30 minutes per work)**')
    .addField('daily' ,'m!daily for some daily coins **(1 day per daily)**')
    .addField('shop', 'm!shop to dispay the shop')
    .addField('rich', 'm!rich say the richest people on the economy')
  if (msg.content.startsWith(prefix + 'economy')) {
    msg.reply(embed)
  }
});
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#1BEC0A')
    .setThumbnail(msg.author.displayAvatarURL())
    .setTimestamp()
    .setTitle('COMMANDS OF THE BOT')
    .setDescription('prefix `m!`')
    .addField('fun', '`m!fun`')
    .addField('econommy', '`m!economy`')
    .addField('others', '`m!others`')
    .addField('random', '`m!random`')
    .addField('moderation', '`m!moderation`')
      if (msg.content.startsWith(prefix + 'help')) {
    msg.reply(embed)
  }
})

client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#1B6CC8')
    .setThumbnail('https://media.giphy.com/media/KiGMzfSIrNf0s/giphy.gif')
    .setTimestamp()
    .setTitle('SHOP <:bolsa:797869062091964496>')
    .addField('NITRO (not in real) <:nitro:797876176265281589>'
      , '10$ <:mdkc:788936738634072074>')
    .addField('WORKER <:worker:797871381555576832>', '10$ <:mdkc:788936738634072074>')
    .addField('COMPUTER <:computer:797877910354264094>', '10$ <:mdkc:788936738634072074>')
      if (msg.content.startsWith(prefix + 'shop')) {
    msg.reply(embed)
  }
});
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#17FF00')
    .setThumbnail('https://www.expertosdecomputadoras.com/wp-content/uploads/2011/12/como%20reiniciar%20un%20trabajo%20en%20unix%20sco.jpg')
    .setTimestamp()
    .setTitle('OTHER COMMANDS')
    .addField('youtube', '`m!youtube` shows my yt')
    .addField('twitch', '`m!twitch` shows my twitch')
    .addField('updates', '`m!changelog` show all the recent updates of the bot')
    .addField('invite', '`m!invite` u can invite the bot to your server')
    .addField('music', 'with `m!music` says the best music')
    .addField('vote', 'with `m!vote` u can vote for the bot')
    .addField(`ping`, `Check the bot's ping`)
    .addField('suggest', 'with `m!suggest` send a suggestion for the bot')
    .addField('say', 'with `m!say` send a message u want only for admins for not raids')
    .addField('report', 'm!report is to report buge')
    .addField('suggest', 'm!suggest is for suggestions for the bot')
      if (msg.content.startsWith(prefix + 'others')) {
    msg.reply(embed)
  }
});
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription('Updates of the bot')
    .setThumbnail('https://media.giphy.com/media/5wWf7HapUvpOumiXZRK/giphy.gif')
    .setTimestamp()
    .setTitle('Update Info')
    .addField('1.1', 'add a ton of new memes in memes commands and minecraft memes in the minecraft command, and some music to the music commands')
    .addField('1.2', 'convert some commands on embed')
    .addField('1.3', 'convert all commands in embeds (exept the secret comms), and removed no command')
    .addField('1.4', 'the new economy system is here `m!help economy` for more info, add a ton of changes on `m!help` and add some memes and fix music problem ')
    .addField('1.5', 'add some changes to `m!youtube`, `m!twitch` and `m!invite` and add some authors to the embeds.')
    .addField('1.6', 'fix `m!help fun` command and is now more organized for the people and add some changes to `m!help others`')
    .addField('1.7', 'put more music in `m!musica` and add a ton of memes on `m!meme`')
    .addField('1.8', 'add secret commands 0_0')
    .addField('1.9', 'change the `m!help economy` to `m!economy`, change `m!help fun` to `m!fun` and change `m!help others` to `m!others` and add emotes to the economy system')
    .addField('2.0', 'we open the new shop !!!!!!!! `m!shop` for the shop ')
    .addField('2.1', 'we add some memes on `m!memes`')
    .addField('2.2', 'add items to `m!shop` u can now buy more things and add some music and more memes ')
    .addField('2.3', 'add more memes and finnaly i do an update for the command `m!mainkra` ')
    .addField('2.31', 'the `m!tu mama` is back!! and fixed some bugs')
    .addField('2.4', 'a two new commands has begun `m!web` and `m!support` finnaly a new support server and fixed some bugs')
    .addField('2.41', 'an small update that contains `m!vote` and now `m!musica` is `m!music`')
    .addField('2.5', 'FINNALY MODERATION COMMANDS ARE HEREEEEE !!!!!! THE `m!moderation` is finnaly here guys u can now purge msgs and kick members and ban but the bot and u need to have perms to nobody raid ur server we added some things and too much commands like `m!ping` or `m!rps` and more secrets 0_0...')
    .addField('2.6', 'NEW ARRAY OF STATUS ON DISCORD !!! NOW THE BOT CHANGE OF STATUS ON 1000 SECONDS AND THATS NICE !!!')
    .addField('2.7', 'new commands of memes now is classified `m!meme esp` is an spanish memes and `m!meme eng` is the memes on english')
    .addField('2.71', 'some commands added like `m!eval` and `m!web` not too much I was very busy with eval command sorry :/')
    .addField('2.8', 'NEW COMMANDS LIKE `m!say` remastered  for only admins for now!! and I add a new suggestion system with the `m!suggestion` command and it sends ur suggest to a channel on the support server called suggestions and u can vote')
    .addField('2.81', 'made some commands on spanish to english nothing else xD *small updates*')
    .addField('2.82', 'sorry not too much on this update i have personal problems but i added a command m!report 3.0 is near...?')
    .addField('2.83', 'added more secrets')
      if (msg.content.startsWith(prefix + 'changelog')) {
    msg.reply(embed)
      }
}); 

  
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of a egg')
    .setTimestamp()
    .setTitle('egg')
    .setImage('https://static01.nyt.com/images/2019/02/05/world/05egg/15xp-egg-promo-articleLarge-v2.jpg?quality=75&auto=webp&disable=upscale')
          if (msg.content.startsWith(prefix + 'egg')) {
    msg.reply(embed)
      }
      });   
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of cringeman')
    .setTimestamp()
    .setTitle('cringeman')
    .setImage('https://i.ytimg.com/vi/npQtRmpe3mg/maxresdefault.jpg')
          if (msg.content.startsWith(prefix + 'cringeman')) {
    msg.reply(embed)
          }
      });   
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of a noob')
    .setTimestamp()
    .setTitle('noob')
    .setImage('https://i.pinimg.com/originals/0c/85/c5/0c85c5f418fad1c881389fb8ce3ea8c4.png')
          if (msg.content.startsWith(prefix + 'noob')) {
    msg.reply(embed)
          }
      });   
    client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of crow')
    .setTimestamp()
    .setTitle('crow')
    .setImage('https://cdn.discordapp.com/attachments/760494112398508092/775397965752959026/Crow_Men.png')
          if (msg.content.startsWith(prefix + 'crow')) {
    msg.reply(embed)
          }
      });   
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of maik wasowski')
    .setTimestamp()
    .setTitle('maik wasowski')
    .setImage('https://ih1.redbubble.net/image.909979035.9762/flat,1000x1000,075,f.jpg')
    if (msg.content.startsWith(prefix + 'maik wasowski')) {
    msg.reply(embed)
          }
      }); 
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor('#E74646')
    .setTitle('MY YOUTUBE')
    .setURL('https://www.youtube.com/c/eitanmdkoficial')
    if (msg.content.startsWith(prefix + 'youtube')) {
    msg.reply(embed)
          }
      }); 
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
  .setColor('#2CA93D')
    .setTimestamp()
    .setTitle('MY PAGE')
    .setURL('https://bot-mdk.zyrosite.com/')
    if (msg.content.startsWith(prefix + 'web')) {
    msg.reply(embed)
          }
      }); 
        client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
  .setColor('#A92C56')
    .setTimestamp()
    .setTitle('SUPPORT SERVER')
    .setURL('https://discord.com/invite/Zb3CujRsxT')
    if (msg.content.startsWith(prefix + 'support')) {
    msg.reply(embed)
          }
      });
        client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
  .setColor('#6C0ED7')
    .setTimestamp()
    .setTitle('MY TWITCH')
    .setURL('https://www.twitch.tv/eit4nmdk')
    if (msg.content.startsWith(prefix + 'twitch')) {
    msg.reply(embed)
          }
      }); 
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of a bad face')
    .setTimestamp()
    .setTitle('BAD FACE')
    .setImage('https://i.pinimg.com/originals/f9/be/3c/f9be3c86216a46d55f3aec1a991647f7.jpg')
    if (msg.content.startsWith(prefix + 'badface')) {
    msg.reply(embed)
          }
      }); 
              client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of salt')
    .setTimestamp()
    .setTitle('salt')
    .setImage('http://t0.gstatic.com/images?q=tbn:ANd9GcSKMJq2bjBIODuOnHYFVUs7JTv1l4-WJNMxu8VvIrUtPxM2lX8erCQXA5jRHOdMYTabWieUiagQKt9WNT9iptI')
    if (msg.content.startsWith(prefix + 'salt')) {
    msg.reply(embed)
          }
      }); 
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of queee')
    .setTimestamp()
    .setTitle('queee')
    .setImage('https://media1.tenor.com/images/d0453d92365c37e233d6678b80cc8e2b/tenor.gif?itemid=16001356')
    if (msg.content.startsWith(prefix + 'queee')) {
    msg.reply(embed)
          }
               })
  client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of auto')
    .setTimestamp()
    .setTitle('auto')
    .setImage('https://media.giphy.com/media/WApIcl7whuH3W/giphy.gif')
    if (msg.content.startsWith(prefix + 'auto')) {
    msg.reply(embed)
          }
               })
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setDescription('image of a chau')
    .setTimestamp()
    .setTitle('chau')
    .setImage('https://media.tenor.com/images/5351263ef85842804aafb923cd816983/tenor.gif')
    if (msg.content.startsWith(prefix + 'chau')) {
    msg.reply(embed)
          }
               })
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle('INVITE THE BOT')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=769400040962916382&permissions=8&scope=bot')
    .setColor('#29D70E')
    if (msg.content.startsWith(prefix + 'invite')) {
    msg.reply(embed)
          }
      }); 
/////////////mod////////////////
bot.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    
    
    if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username}'s commands`)
            .setDescription(`**Prefix:** ${config.prefix}`)
            .addField(`\`ping\``, `Check your bot's ping`)
            .addField(`\`kick\``, `Usage: **${config.prefix}kick [@User]**\n**${config.prefix}kick [@User][Reason]**`)
            .addField(`\`ban\``, `Usage: **${config.prefix}ban [@User]**\n**${config.prefix}ban [@User][Reason]**`)
            .addField(`\`add\``, `Adds a role to a user \nUsage: **${config.prefix}add [@User] [Role]**`)
            .addField(`\`remove\``, `Removes a role from a user \nUsage: **${config.prefix}remove [@User] [Role]**`)
            .addField(`\`purge\``, `Clears a number of messages between 2 or 100 \nUsage: **${config.prefix}purge [number]**`)
            .addField(`\`rps\``, `Play rock paper scissors`)
            .addField(`\`say\``, `Have the bot say something`)
        message.channel.send(helpEmbed)
    }

    if (command === "ping") {
        message.channel.send(`Pong **(${Date.now() - message.createdTimestamp}ms)**`)
    }

    if (command === "kick") {
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send("Insufficient permissions (Requires permission `Kick members`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.kickable)
            return message.channel.send("This user is unkickable or has a role after me").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} was kicked, no reason was provided`);
            })

            if (reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} was kicked for ${reason}`);
            })
        }
    }

    if (command === "ban") {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send("Insufficient permissions (Requires permission `Ban members`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.bannable)
            return message.channel.send("This user is unbannable").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.ban().then(member => {
                message.channel.send(`${member.user.tag} was banned, no reason was provided`);
            })

            if (reason) return member.ban(reason).then(member => {
                message.channel.send(`${member.user.tag} was banned for ${reason}`);
            })
        }
    }

    if (command === "add") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Insufficient permissions (Requires permission `Manage roles`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const add = args.slice(1).join(" ")
        if (!add)
            return message.channel.send("You have not specified a role").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleAdd = message.guild.roles.cache.find(role => role.name === add)
        if (!roleAdd)
            return message.channel.send("This role does not exist").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (member.roles.cache.get(roleAdd.id))
            return message.channel.send(`This user already has the ${add} role`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.add(roleAdd.id).then((member) => {
            message.channel.send(`${add} added to ${member.displayName}`)
        })
    }

    if (command === "remove") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Insufficient permissions (Requires permission `Manage roles`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const remove = args.slice(1).join(" ")
        if (!remove)
            return message.channel.send("You have not specified a role").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleRemove = message.guild.roles.cache.find(role => role.name === remove)
        if (!roleRemove)
            return message.channel.send("This role does not exist").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.roles.cache.get(roleRemove.id))
            return message.channel.send(`This user does not have the ${remove} role`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.remove(roleRemove.id).then((member) => {
            message.channel.send(`${remove} removed from ${member.displayName}`)
        })
    }

    if (command === "say") {
    const text = args.join(" ")
    if(!text) return message.channel.send("You have not specified something to say").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    message.channel.send(text)
    
    }
   
    if (command === "purge") {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Insufficient permissions (requires permission `Manage messages`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    const number = args.join(" ")
    if(!number) return message.channel.send("You haven't specified a number to purge").then(msg => {
        msg.delete({ timeout: 30000 })
    })
   message.channel.bulkDelete(number).catch(console.error)
   
   }
    
   if (command === "rps") {
        const options = [
            "rock :shell: ",
            "paper :newspaper2:",
            "scissors :scissors: "
        ]
        const option = options[Math.floor(Math.random() * options.length)]
        message.channel.send(`You got ${option}`)
    }

});
////////////token///////////////

client.login(process.env.TOKEN);