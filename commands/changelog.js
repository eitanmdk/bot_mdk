const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "changelog",
  alias: [],

execute (client, message, args){

  const changelog = args.join(" ")

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
    .addField('2.9', 'FINNALY A GOOD UPDATE, make an `m!about` and make some secrets and update the array of status')
    .addField('3.0', 'THE BEST UPDATE EVER MADE !!!! THE NEW UPDATE COME WITH A NEW MUSIC SYSTEM `m!music` FOR THE COMMANDS NOW U CAN MAKE HOWGAY U ARE WITH `m!howgay` AND U CAN MENTION FOR KNOW HOW THEY GAY ARE ALSO THE `m!hack` COMMAND HAS BECOME YOU CAN NOW HACK PEOPLE WITH MY BOT AND A LOT OF THINGS MORE LIKE SECRET COMMS USE IT AND `m!peter-griffin` COMMAND IS HERE U CAN PUT UR AVATAR OR THE OTHERS AVATAR ON THE FACE OF PETER LOL AND A NEW SYSTEM OF HANDLER HAS BECOME TAKE CARE')
    .addField('3.1', 'Bassicly a bug fix nothing else and i add all commands of 3.0 on help comms')
    .addField('3.2', 'Rremasterized all the help command and i made some new commands like `m!snipe`, `m!work` and `m!bal` and we re-opened our ECONOMY SYSTEM GGS')
    .addField('3.3', 'Fixed problem with help, new command !!! `m!dep` and i update `m!av` now you can mention, 3 new commands more !!! `m!commands` `m!servers`, `m!users` and new IMPLEMENT **LOGS**!!!! `m!setlogs` for the new logs system GGs and `m!punch` command, and a new command `m!serverinfo`')
    message.channel.send(embed)

 }
}