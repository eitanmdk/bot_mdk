//PROFILE SCHEMA--------------------------------------------------------
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  coins: { type: Number, default: 1000 },
  bank: { type: Number },
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;


//guildMemberAdd--------------------------------------------------------
const profileModel = require("../../models/profileSchema");

module.exports = async (client, discord, member) => {
  let profile = await profileModel.create({
    userID: member.id,
    serverID: member.guild.id,
    coins: 1000,
    bank: 0,
  });
  profile.save();
};

//MESSAGE.JS --------------------------------------------------------
const profileModel = require("../../models/profileSchema");

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let profileData;
  try {
    profileData = await profileModel.findOne({ userID: message.author.id });
    if (!profileData) {
      let profile = await profileModel.create({
        userID: message.author.id,
        serverID: message.guild.id,
        coins: 1000,
        bank: 0,
      });
      profile.save();
    }
  } catch (err) {
    console.log(err);
  }
  
  command.execute(message, args, cmd, client, Discord, profileData);
  
  //BALANCE.JS --------------------------------------------------------
  module.exports = {
  name: "balance",
  aliases: ["bal", "bl"],
  permissions: [],
  description: "Check the user balance",
  execute(message, args, cmd, client, discord, profileData) {
    message.channel.send(`Your wallet bal is ${profileData.coins}, you banks bal is ${profileData.bank}`);
  },
};

  //BEG.JS --------------------------------------------------------
  const profileModel = require("../models/profileSchema");
module.exports = {
  name: "beg",
  aliases: [],
  permissions: [],
  description: "beg for coins",
  async execute(message, args, cmd, client, discord, profileData) {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: randomNumber,
        },
      }
    );
    return message.channel.send(`${message.author.username}, you begged and received ${randomNumber} **coins**`);
  },
};

