const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("get command info")

    .addStringOption(option =>
      option.setName('command')
        .setDescription('choose avaliable commands')
        .setRequired(true)
        .addChoices({
          name: 'help',
          value: '{ "command": "help", "description": "get command info", "parameter": "[command]"}'
        })
    ),
  async execute(interaction) {
    let choice = JSON.parse(interaction.options.getString('command'));
    let embed = new MessageEmbed()
      .setColor('#00ff00')
      .setTitle(`HELP: ${choice["command"]}`)
      .setDescription(`${choice["description"]}`)
      .addField(`/${choice["command"]} ${choice["parameter"]}`, "©keegang6705\n(not require)\n<require>\n[choice]", true)
      .setTimestamp()
    await interaction.reply({
      embeds: [embed],
      ephemeral: false
    });
  }
}
