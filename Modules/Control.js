const Discord = require("discord.js");

const command_help = (msg) => {
	const embed = new Discord.RichEmbed()
		.setTitle("Khassk chi mosa3ada?")
		.setColor("0xFF00")
		.addField("!help", "Displays this message", true)
		.addField("!info [user]", "Shows [user]'s server info", true)
		.addField("!achievements [user]", "Shows [user]'s achievements", true)
		.addField("!cursus [user]", "Shows [user]'s 42 Cursus info", true)
		.addField("!where [user]", "Shows where is the [user]. ex: e1r4p13", true)
	msg.channel.send(embed);
}

const command_error = (msg) => {
	const embed = new Discord.RichEmbed()
		.setTitle("Trkila Exception 404")
		.setColor("0xFF0000")
		.setDescription("Anonymous control string not found");
	msg.channel.send(embed);
}

const command_not_implemented = (msg) => {
	const embed = new Discord.RichEmbed()
		.setTitle("Trkila Exception 501")
		.setColor("0xFF0000")
		.setDescription("Not implemented, ya ima l3gz, ya ima lw9t, chi PR brojola");
	msg.channel.send(embed);
}

const command_info = (msg) => {
	command_not_implemented(msg)
}

const command_achievements = (msg) => {
	command_not_implemented(msg)
}

const command_cursus = (msg) => {
	command_not_implemented(msg)
}

const command_where = (msg) => {
	command_not_implemented(msg)
}

module.exports = class Control {
	static command(msg) {
		if (msg.content[0] == '!') {
			switch (msg.content.replace(/^!/gm, '')) {
				case "help":
					command_help(msg); break;
				case "info":
					command_info(msg); break;
				case "achievements":
					command_achivements(msg); break;
				case "cursus":
					command_cursus(msg); break;
				case "where":
					command_where(msg); break;
				default: {
					command_error(msg)
				}
			}
		}
	}
}
