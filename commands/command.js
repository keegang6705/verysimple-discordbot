const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("command")
    .setDescription("get command info")

    .addStringOption(option =>
      option.setName('???')
        .setDescription('???')
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply({
      content: "nothing",
      ephemeral: false
    });
  }
}
