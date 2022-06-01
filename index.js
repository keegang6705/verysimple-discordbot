/////////////import////////////
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const print = console.log;
const Discord = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
////////////////other variable///////////////////
const commands = [];
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
///////////////////function/////////////////////
function date() {
  let today = new Date();
  let date = '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  let time = ":" + today.getMinutes() + ":" + today.getSeconds();
  let day = today.getDate();
  let hr = today.getHours();
  return day + date + "|" + hr + time;
};
/////////////////////start/////////////////////
fs.appendFile('LOG.log', `-------------------------------------------\n`, function(err) {
  if (err) throw err;
});
fs.writeFile('DEBUG.log', `-------------------------------------------\n`, function(err) {
  if (err) throw err;
});
fs.appendFile('LOG.log', `start run code: [${date()}]\n`, function(err) {
  if (err) throw err;
});
bot.on("debug", (e) => {
  fs.appendFile('DEBUG.log', `debug:${e} [${date()}]\n`, function(err) {
    if (err) throw err;
  });
});
bot.on("ready", () => {
  print("working...");
  print(`log in as ${bot.user.tag}`);
  fs.appendFile('LOG.log', `log in as:${bot.user.tag} [${date()}]\n`, function(err) {
    if (err) throw err;
  });
});
/////////////////////////code////////////////////////////
bot.on("messageCreate", (message) => {
  if (message.content == ">>ping") {
    message.channel.send("running pls wait...").then((msg) => {
      msg.edit("ping: " + (Date.now() - msg.createdTimestamp + "ms"))
    });
  }
});


for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  bot.commands.set(command.data.name, command);
}

const rest = new REST({ version: '9' }).setToken(process.env['token']);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    fs.appendFile('LOG.log', `Started refreshing application (/) commands. [${date()}]\n`, function(err) {
      if (err) throw err;
    });

    await rest.put(
      Routes.applicationCommands("887217412376776745"),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
    fs.appendFile('LOG.log', `Successfully reloaded application (/) commands. [${date()}]\n`, function(err) {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error);
    fs.appendFile('LOG.log', `error: ${error} [${date()}]\n`, function(err) {
      if (err) throw err;
    });
  }
})();
//////////////////////interaction/////////////////////////
bot.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  const command = bot.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    if (err) console.error(err);
    let embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle("An error occurred while executing that command.")
        .setDescription("002 command error")
        .setTimestamp()
    await interaction.reply({
        embeds: [embed],
        ephemeral: true
      });
  }
});
///////////////////////////end///////////////////////////
print("code running");
bot.login(YOURTOKEN);
