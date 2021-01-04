////////constantes/////////

const Discord = require('discord.js');
const client = new Discord.Client();
const express = require ('express')
const http = require("http");
const app = express()
const Fs = require("fs");

////////////server/////////////

require('dotenv').config();
app.get('/', function(req, res){
  res.send('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
})
let port = process.env.PORT || 3000;
app.listen(port)

require('dotenv').config()

//////////consola///////////

let prefix = process.env.PREFIX;
client.on('ready', () => {
  console.log('GG')
  client.user.setStatus('Online')
  client.user.setActivity('m!help for commmands', { type: 'WATCHING'})
  });
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
                message.channel.send(WarningEmbed);
                return;
            }

            UserJSON[message.author.id] = {
                bal: 0,
                lastclaim: 0,
                lastwork: 0,
                workers: 0,
            }
            Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("You have joined the economy! type `m!help economy` to get started");
            message.channel.send(SuccessEmbed);
            return;
        }
        if (args[0] == "daily") {
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));
            if (Math.floor(new Date().getTime() - UserJSON[message.author.id].lastclaim) / (1000 * 60 * 60 * 24) < 1) {
                let WarningEmbed = new Discord.MessageEmbed()
                WarningEmbed.setTitle("**ERROR**");
                WarningEmbed.setDescription("You have claimed today already");
                message.channel.send(WarningEmbed);
                return;
            }
            UserJSON[message.author.id].bal += 500;
            UserJSON[message.author.id].lastclaim = new Date().getTime();
            Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));
            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("You have claimed a daily reward of 500 MDK coins 788936738634072074 ");
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
                ErrorEmbed.setDescription("Please specify an amount to give .");
                message.channel.send(ErrorEmbed);
                return;
            }

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You have not started the game yet.");
                message.channel.send(ErrorEmbed);
                return;
            }
            if (isNaN(Money)) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify a number");
                message.channel.send(ErrorEmbed);
                return;
            }
            if (UserJSON[message.author.id].bal < Money) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You do not have enough money ");
                message.channel.send(ErrorEmbed);
                return;
            }
            if (Money.indexOf(".") != -1 || Money.indexOf("-") != -1 || Money == 0) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an integer value greater than 0");
                message.channel.send(ErrorEmbed);
                return;
            }

            let Mentioned = message.mentions.members.first();
            if (!Mentioned) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please mention a user");
                message.channel.send(ErrorEmbed);
                return;
            }
            if (!UserJSON[Mentioned.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("That person does not play the game.");
                message.channel.send(ErrorEmbed);
                return;
            }

            UserJSON[message.author.id].bal -= parseInt(Money);
            UserJSON[Mentioned.id].bal += parseInt(Money);

            Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("You have given " + Money + " MDK coins  to " + Mentioned.user.username);
            message.channel.send(SuccessEmbed);
        }

        if (args[0] == "bal") {
            // Action Here
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You must be playing the game.");
                message.channel.send(ErrorEmbed);
                return;
            }
            let mentioned = message.mentions.members.first();
            if (mentioned) {
                if (!UserJSON[mentioned.id]) {
                    let ErrorEmbed = new Discord.MessageEmbed();
                    ErrorEmbed.setTitle("**ERROR**");
                    ErrorEmbed.setDescription("That person is not playing the game.");
                    message.channel.send(ErrorEmbed);
                    return;
                }
                let SuccessEmbed = new Discord.MessageEmbed();
                SuccessEmbed.setTitle("**SUCCESS**");
                SuccessEmbed.addField("Balance", UserJSON[mentioned.id].bal);
                message.channel.send(SuccessEmbed);
                return;
            } else {
                let SuccessEmbed = new Discord.MessageEmbed();
                SuccessEmbed.setTitle("**SUCCESS**");
                SuccessEmbed.addField("Balance", UserJSON[message.author.id].bal);
                message.channel.send(SuccessEmbed);
                return;
            }
        }
        if (args[0] == "buy") {
            let UserJSON = JSON.parse(Fs.readFileSync("./DB/users.json"));

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You must be playing the game.");
                message.channel.send(ErrorEmbed);
                return;
            }

            let item = args[1];
            let amount = args[2];

            if (!item) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an item.");
                message.channel.send(ErrorEmbed);
                return;
            }
            if (!amount) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an amount of 788936738634072074");
                message.channel.send(ErrorEmbed);
                return;
            }
            if (isNaN(amount)) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify a number of MDK COINS");
                message.channel.send(ErrorEmbed);
                return;
            }
            if (amount == 0 || amount.indexOf("-") != -1 || amount.indexOf(".") != -1) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an integer value greater than 0 .");
                message.channel.send(ErrorEmbed);
                return;
            }

            switch (item) {
                case 'worker':
                 case 'nitro':
                  case 'computer':
                   case 'eitanmdk':
                    if (7 * parseInt(amount) > UserJSON[message.author.id].bal) {
                        let ErrorEmbed = new Discord.MessageEmbed();
                        ErrorEmbed.setTitle("**ERROR**");
                        ErrorEmbed.setDescription("You do not have enough ");
                        message.channel.send(ErrorEmbed);
                        return;
                    }

                    UserJSON[message.author.id].workers += parseInt(amount);
                    UserJSON[message.author.id].bal -= parseInt(amount) * 7;
                    Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

                    let SuccessEmbed = new Discord.MessageEmbed();
                    SuccessEmbed.setTitle("**SUCCESS**");
                    SuccessEmbed.setDescription(`You have bought ${amount} ${item}s.`);
                    message.channel.send(SuccessEmbed);
                    break;
                default:
                    let ErrorEmbed = new Discord.MessageEmbed();
                    ErrorEmbed.setTitle("**ERROR**");
                    ErrorEmbed.setDescription("The item you are trying to buy does not exist.");
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
                message.channel.send(ErrorEmbed);
                return;
            }

            let deltaTime = Math.floor((new Date().getTime() - UserJSON[message.author.id].lastwork) / (1000 * 60));
            if (deltaTime < 30) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription(`You can work in ${30 - deltaTime} minutes.`);
                message.channel.send(ErrorEmbed);
                return;
            }

            UserJSON[message.author.id].bal += (UserJSON[message.author.id].workers + 1) * 2;
            UserJSON[message.author.id].lastwork = new Date().getTime();
            Fs.writeFileSync("./DB/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription(`You have earned ${(UserJSON[message.author.id].workers + 1) * 2} MDK Coins `);
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
                .setTitle("**RICHEST PEOPLE OF THE GAME**")
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
})
client.on('message', msg => {
  if (msg.content === prefix + 'tu mama') {
    msg.reply('jajajajajajajaja');
  }
});
client.on('message', msg => {
  if (msg.content === prefix + 'german') {
    msg.reply('TU MAMA');
  }
});
client.on('message', msg => {
  if (msg.content === prefix + 'germanfrase') {
    msg.reply('TU MAMA');
  }
});
client.on('message', msg => {
  if(msg.content === prefix + 'tipi malo')
  msg.reply('tipi malo ):)')
})
client.on('message', msg => {
  if(msg.content === prefix + 'dormir') {
  msg.reply('wenas noches ;)')
  }
});
/////////////randoms///////////
client.on('message', message => {
  var Mensages = ['https://www.eluniversal.com.mx/sites/default/files/2020/08/30/memes.jpeg', 'https://de10.com.mx/sites/default/files/styles/galeria_photo_760x508/public/2020/11/06/16_memes_buen_fin.jpg?itok=g_Ly_gqf', 'https://offloadmedia.feverup.com/barcelonasecreta.com/wp-content/uploads/2020/04/09104747/memes.jpg', 'https://offloadmedia.feverup.com/barcelonasecreta.com/wp-content/uploads/2020/04/09104747/memes.jpg', 'https://www.fcbarcelonanoticias.com/uploads/s1/12/00/52/0/meme-de-sergio-ramos.jpeg', 'https://i.blogs.es/0ec27f/memess/1366_2000.jpg', 'https://i1.wp.com/www.materiagris.es/wp-content/uploads/2018/10/memes-comunicacion.jpg?resize=700%2C321&ssl=1', 'https://de10.com.mx/sites/default/files/styles/galeria_photo_760x508/public/2020/11/06/5_memes_buen_fin.jpg?itok=bA71XxQu', 'https://i.pinimg.com/236x/1d/c5/bf/1dc5bf2c730036567aecd29394402ab4.jpg', 'https://i.pinimg.com/736x/a8/4f/a4/a84fa4c0ee8384b46ac5120ce8584401.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_2frJhlo4gvQAoXXm8wBiGrFpBevvgHzWjA&usqp=CAU', 'https://elbocon.pe/resizer/SdPY21IdQQFnNqxrid9omQbZSfo=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/GT4CNSAFUVF63BNXFA6VCFGSGM.jpg', 'https://integralatampost.s3.amazonaws.com/uploads/article/picture/22868/2020-06-30_15_562020-06-30_15_4020200701_Los-mejores-memes-para-el-inicio-de-mes.jpg', 'https://i.blogs.es/a9260e/destacada/450_1000.jpg', 'https://www.isdi.education/sites/default/files/styles/noticia_basico/public/noticias/meme_marketing_0.png?itok=aU4_RxRJ', 'https://www.fundeu.es/wp-content/uploads/2013/02/RecMemes.jpg', 'https://spoiler.bolavip.com/__export/1600954443613/sites/bolavip/img/2020/09/24/memes_anne_with_an_e_serie_crop1600954442906.jpg_554688468.jpg', 'https://images.daznservices.com/di/library/GOAL/7b/f2/memes-bartomeu-dimision_1q6opxecgadhj1cv1l1nkttqe6.jpeg?t=1873880933&quality=100', 'https://i.ytimg.com/vi/gz0CYLoE6_o/maxresdefault.jpg', 'https://i.ytimg.com/vi/gsS21876yEk/maxresdefault.jpg', 'https://i.ytimg.com/vi/mxyLncDe9pA/maxresdefault.jpg', 'https://i.ytimg.com/vi/_01l_NMVTT0/maxresdefault.jpg', 'https://i.ytimg.com/vi/x1gqTWsVcJE/maxresdefault.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnlFhZd1mG6KYXhoFOBZ3N-JcZDzNLBvV2PA&usqp=CAU', 'https://imagenes.milenio.com/-Vnmwi5lBgeD-WfYH4n0lyz6nEI=/958x596/https://www.milenio.com/uploads/media/2020/11/16/un-meme-sobre-disney-plus.jpg', 'https://www.fundaciontelefonica.com.ar/wp-content/uploads/2019/05/abuelita-viendo-su-computadora-meme-1.png', 'https://www.getcleartouch.com/wp-content/uploads/meme-to-go-back-to-school.jpg', 'https://images.clarin.com/2018/04/29/don-ramon-siempre-presente-en___r1FfL18pf_720x0__1.jpg', 'https://www.lavanguardia.com/r/GODO/LV/p7/WebSite/2020/07/03/Recortada/img_tayala_20200703-125951_imagenes_lv_terceros_meme-357-kpKE-U4820612666872HE-992x558@LaVanguardia-Web.jpg', 'https://cr00.epimg.net/radio/imagenes/2020/10/21/tendencias/1603302012_839235_1603303414_noticia_normal.jpg', 'https://www.elsoldemexico.com.mx/doble-via/virales/5p5gg8-meme-josejose2.jpg/ALTERNATES/LANDSCAPE_400/meme-josejose2.jpg', 'https://i.ytimg.com/vi/2AwRvVxXez0/maxresdefault.jpg', 'https://pbs.twimg.com/media/DR7ZBC_X4AArYz7.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGj-2JjR4wBElH4nWb4LpB0Crb0z6sQVFibg&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLyXLNj_tu2meh8af924uQ00zpHTD5Mdzn8g&usqp=CAU', 'https://i.ytimg.com/vi/gM8f_1grmqo/maxresdefault.jpg', 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/10/08/16021428266524.jpg', 'https://i.pinimg.com/originals/05/18/12/051812216879683e350f0392d8c0b4b0.jpg', 'https://animal.mx/wp-content/uploads/2020/09/sticker-among-us.jpg', 'https://images.clarin.com/2020/09/10/among-us-los-memes-del___Fnepwx9g7_720x0__1.jpg', 'https://i1.wp.com/erizos.mx/wp-content/uploads/2020/09/photo_2020-09-10-13.31.58.jpeg?fit=1200%2C630&ssl=1', 'https://i.pinimg.com/564x/d5/18/d5/d518d52fee01e7efaa7c541ab15f5f60.jpg', 'https://i.pinimg.com/originals/7e/70/7f/7e707fd6fbc2d692c9966557483016ff.png', 'https://image.winudf.com/v2/image/Y29tLmx1emFwcHMubWVtZWNoaXN0b3Nvc19zY3JlZW5fMTNfamF2cjl1dzA/screen-13.jpg?fakeurl=1&type=.jpg', 'https://assets.metrolatam.com/co/2015/05/27/captura-de-pantalla-2015-05-26-a-las-17-30-43-1600x800.jpg', 'https://static.paraloscuriosos.com/img/articles/26567/832x416/5bc988821cf15_2.jpg', 'https://www.pintamania.com/fr-730x430-data/fotos/meme-gracioso-meme.jpg', 'https://media.ambito.com/adjuntos/239/imagenes/037/508/0037508225.jpg?0000-00-00-00-00-00', 'https://www.meddigitalmkt.com/wp-content/uploads/2020/04/memes-1-1024x814.jpg', 'https://i0.wp.com/memeschistosos.net/wp-content/uploads/2017/03/nuevas-imagenes-y-memes-chistosos-2017-39.png?w=730', 'https://informacionimagenes.net/wp-content/uploads/2020/02/3a325a537d5334a505f96b4587360d2c.jpg', 'https://img.scoop.it/EOU2hLLELJuERMVdkgIZwzl72eJkfbmt4t8yenImKBVvK0kTmF0xjctABnaLJIm9', 'https://lh3.googleusercontent.com/IXVhWQLf-IYgKAHykh9pWzmKF_OOObE5g-3gk5IrCocGB2tHtK_Gtd6PlUCFfXnbfv0=h750', 'https://i0.wp.com/estopalwasap.com/wp-content/uploads/2019/01/memes-chistosos-09.jpg?w=730', 'https://static.paraloscuriosos.com/img/articles/26702/356x178/5bd2b836c3f39_la-mejor-dosis-de-memes-de-todos-los-tiempos.jpg', 'https://okdiario.com/img/2019/02/08/los-mejores-memes-de-san-valentin-2019-oficina-620x349.jpg', 'https://memes-graciosos.com/images/2019/03/06/memes-chistosos.md.png', 'https://i0.wp.com/memeschistosos.net/wp-content/uploads/2017/03/nuevas-imagenes-y-memes-chistosos-2017-40.png?w=730', 'https://i.ytimg.com/vi/U00Vq91vXyU/maxresdefault.jpg', 'https://i.pinimg.com/originals/96/aa/cf/96aacf3822330a5320e57b500a3e6b1d.jpg', 'https://www.memeschistosos.com.mx/wp-content/uploads/2017/07/Memes-Chistosos-para-Mi-Novio-5-300x300.jpg', 'https://i.pinimg.com/236x/99/70/78/9970781473af6f5dafa81e08ea2ed33b.jpg', 'https://i.pinimg.com/originals/65/81/98/65819866889901b6e3d42d80aa5bf63f.jpg', 'https://i.pinimg.com/474x/df/78/75/df7875fa004b34c722a23b94266c56bc.jpg', 'https://i.pinimg.com/originals/21/4f/19/214f19d7cd6571853e815483519b5f3e.jpg', 'https://i.pinimg.com/474x/2e/6b/21/2e6b21dd9d2e6d20139f3371ce5270d6--meme-humor-funny-posts.jpg', 'https://i.pinimg.com/736x/b1/2e/4c/b12e4c17832bf7c90cb5324e664a78f6.jpg', 'https://i.pinimg.com/474x/2c/61/26/2c612607457b070cd4ddec6d958d1ede.jpg', 'https://i.pinimg.com/originals/6b/14/77/6b1477f4abb814455d82614036e86836.jpg', 'https://i.pinimg.com/474x/89/c3/0f/89c30f68483ff378d740cec5f10cefbf.jpg', 'https://i.pinimg.com/564x/b9/2b/51/b92b51fcb44a1a566c8a27237939987e.jpg', 'https://i.pinimg.com/236x/a2/93/38/a293388b176cd68b6a62f50d3310f93c--kermit-the-frog-mexican-humor.jpg', 'https://i.pinimg.com/236x/44/c8/aa/44c8aa4a6e9de0138e7f7878b5f760f3--gifs-graciosos-humor-memes.jpg', 'https://i.pinimg.com/736x/2d/d0/f0/2dd0f0b1cc6c6129499ca60ab27c99ca.jpg', 'https://i.pinimg.com/236x/d4/ba/ce/d4bacee7f89fd642a2b21298a7189510--humor-cristiano-hilarious.jpg', 'https://eyezen.es/wp-content/uploads/2018/10/llama.jpg', 'https://www.lavanguardia.com/r/GODO/LV/p7/WebSite/2020/08/14/Recortada/img_egago_20200814-234049_imagenes_lv_otras_fuentes_meme5-kOPD-U482813945290hIF-992x558@LaVanguardia-Web.JPG', 'https://image.winudf.com/v2/image/Y29tLmdseWVtYXBwcy5tZW1lc2RpdmVydGlkb3Nfc2NyZWVuXzBfZ2hjcWE0cjA/screen-0.jpg?fakeurl=1&type=.jpg', 'https://www.webespacio.com/wp-content/uploads/2014/05/homero-mama.jpg', 'https://www.informador.mx/__export/1579807757984/sites/elinformador/img/2020/01/23/coronavirus_tepa.jpg_1970638775.jpg', 'https://e.rpp-noticias.io/xlarge/2016/06/14/168006foto1jpg.jpg', 'https://i.pinimg.com/originals/ba/15/ac/ba15acc974671bfd8ba5997900e07ead.png', 'https://www.futbolred.com/files/article_multimedia_gallery/files/crop/uploads/2020/05/16/5ec006b7a760e.r_1589642950163.0-55-718-533.jpeg', 'https://i.pinimg.com/originals/a7/64/47/a76447595797b04c7eae4427d617f4c6.png', 'https://www.eluniversal.com.mx/sites/default/files/u40162/meme_wey_ya_8.jpg'];
  var Aleatorio = Math.floor(Math.random() * (Mensages.length));
  if (message.content.startsWith(prefix + 'meme')) {
    message.channel.send(Mensages[Aleatorio]);
  }
});
client.on('message', message => {
  var Mensages = ['https://www.youtube.com/watch?v=qKp1f7Vn9dM', 'https://www.youtube.com/watch?v=pK060iUFWXg',, 'https://www.youtube.com/watch?v=PEGEiC6Yny4&t=909s', 'https://www.youtube.com/watch?v=_S7WEVLbQ-Y', 'https://www.youtube.com/watch?v=_mPd_SDAryQ&list=PLuREdE64KGBZcmchsICJRT-vaYosb57os&ab_channel=LupeFiasco', 'https://www.youtube.com/watch?v=nEt1bKGlCpM', 'https://www.youtube.com/watch?v=KTWOLOeX90c', 'https://www.youtube.com/watch?v=2Ax_EIb1zks&list=PLfmBZji0GnxzUWO7IKKkvUnEJVxbMkNaO', 'https://www.youtube.com/watch?v=xd_ebCvnGqY&list=PLfmBZji0GnxzUWO7IKKkvUnEJVxbMkNaO&index=5', 'https://www.youtube.com/watch?v=j8Gs_rfhKrY', 'https://www.youtube.com/watch?v=JC0cVDtDPtE', 'https://www.youtube.com/watch?v=rWIUxwNRyRg'];
  var Aleatorio = Math.floor(Math.random() * (Mensages.length));
  if (message.content.startsWith(prefix + 'musica')) {
    message.channel.send(Mensages[Aleatorio]);
  }
});
client.on('message', message => {
  var Mensages = ['https://i.pinimg.com/564x/78/2d/f8/782df84b6431dd78a782bedf53d01f86.jpg', 'https://www.gamedesigning.org/wp-content/uploads/2018/03/v66.jpg', 'https://pm1.narvii.com/6238/467a88fdd43eec9188a5122db341a909373abbef_hq.jpg', 'https://img.memecdn.com/yeah-minecraft-memes-aren-amp-039-t-cool-but-i-just-needed-to-caption-this-pic_o_7255822.jpg', 'https://lh3.googleusercontent.com/proxy/fhQM8sbRE-GOhXb-DkoyRYqVf9Ae93TyFZZBJSQTrZDZ9QDMKHH3QZzdf5HL3WvUAbl_WyKb_50WytzWJkEE1bmqewBPFfkWr_A6p5gdFz-o_kVOhKQ_mg'];
  var Aleatorio = Math.floor(Math.random() * (Mensages.length));
  if (message.content.startsWith(prefix + 'mainkra')) {
    message.channel.send(Mensages[Aleatorio]);
  }
});
//////////////////embeds//////////////////

client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#1BEC0A')
    .setDescription('COMMANDS OF FUN')
    .setAuthor(client.user.username, client.user.avatarURL())
    .setThumbnail('https://media.giphy.com/media/39CgKFYbkxoId4P6Tt/giphy.gif')
    .setTimestamp()
    .setTitle('COMMANDS OF FUN')
    .addField('meme', 'With m!meme says a random meme')
    .addField('noob', 'with m!noob says the roblox noob')
    .addField('maik wasowski', 'with m!maik wasowski says the meme of mike wasowski')
    .addField('tu mama', 'with m!tu mama says jajajajajajajaja')
    .addField('cabeza', 'with m!cabeza says the meme of the head')
    .addField('cara de feo', 'with m!cara de feo says a face of a noob')
    .addField('dormir', 'with m!dormir says wenas noches')
  if (msg.content.startsWith(prefix + 'help fun')) {
    msg.reply(embed)
  }
});
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#1BEC0A')
    .setDescription('COMMANDS OF ECONOMY')
    .setAuthor(client.user.username, client.user.avatarURL())
    .setThumbnail('https://media.giphy.com/media/LdOyjZ7io5Msw/giphy.mp4')
    .setTimestamp()
    .setTitle('COMMANDS OF ECONOMY')
    .addField('m!start', 'm!start starts the economy cathegory')
    .addField('m!work', 'm!work is work for some coins **(30 minutes per work)**')
    .addField('m!daily' ,'m!daily for some daily coins **(1 day per daily)**')
    .addField('m!rich', 'm!rich say the richest people on the economy')
  if (msg.content.startsWith(prefix + 'help economy')) {
    msg.reply(embed)
  }
});
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#1BEC0A')
    .setDescription('COMMANDS OF THE BOT')
    .setThumbnail(msg.author.displayAvatarURL())
    .setTimestamp()
    .setTitle('commands')
    .addField('prefix', 'the prefix is m!')
    .addField('fun', '`m!help fun`')
    .addField('econommy', '`m!help economy`')
    .addField('others', '`m!help others`')
      if (msg.content.startsWith(prefix + 'help')) {
    msg.reply(embed)
  }
});
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#1BEC0A')
    .setThumbnail('https://www.expertosdecomputadoras.com/wp-content/uploads/2011/12/como%20reiniciar%20un%20trabajo%20en%20unix%20sco.jpg')
    .setTimestamp()
    .setTitle('COMMANDS OTHERS')
    .addField('youtube', '`m!youtube` shows my yt')
    .addField('twitch', '`m!twitch` shows my twitch')
    .addField('Updates', '`m!Updates` show all the recent updates of the bot')
    .addField('invite', '`m!invite` u can invite the bot to your server')
        .addField('music', 'with `m!musica` says the best music')
      if (msg.content.startsWith(prefix + 'help others')) {
    msg.reply(embed)
  }
});
client.on('message', msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#0E24D7')
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
      if (msg.content.startsWith(prefix + 'Updates')) {
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
    .setDescription('image of a cabeza')
    .setTimestamp()
    .setTitle('cabeza')
    .setImage('https://cdn.discordapp.com/attachments/760494112398508092/775397965752959026/Crow_Men.png')
          if (msg.content.startsWith(prefix + 'cabeza')) {
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
    .setColor('#FF0000')
    .setTitle('MY YOUTUBE')
    .setURL('https://www.youtube.com/c/eitanmdkoficial')
    if (msg.content.startsWith(prefix + 'youtube')) {
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
    .setDescription('image of feo')
    .setTimestamp()
    .setTitle('cara de feo')
    .setImage('https://i.pinimg.com/originals/f9/be/3c/f9be3c86216a46d55f3aec1a991647f7.jpg')
    if (msg.content.startsWith(prefix + 'cara de feo')) {
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
    .setImage('https://guapasigracias.com/wp-content/uploads/2018/11/signo-mas.png')
    if (msg.content.startsWith(prefix + 'invite')) {
    msg.reply(embed)
          }
      }); 
////////////token///////////////

client.login(process.env.TOKEN);