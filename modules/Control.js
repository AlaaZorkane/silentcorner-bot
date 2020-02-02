const Discord = require("discord.js");
const got = require('got');
const getToken = require('../utils/api');

const help = {
	"help": "Displays this message",
	"banana": "🐁 🐘 🍌 the last message",
	"info [user]": "Shows [user]'s server info",
	"achievements [user]": "Shows [user]'s achievements",
	"cursus [user]": "Shows [user]'s 42 Cursus info",
	"where [user]": "Shows where is the [user]. ex: e1r4p13",
	"bolissi": "Tells you the story of lbolissi",
	"silentcorner": "ma3art",
	"trash": "Gives you the definition of trash"
}

const command_help = (msg) => {
	const embed = new Discord.RichEmbed()
		.setTitle("Khassk chi mosa3ada?")
		.setColor("0xFF00");
	for (const command in help)
		embed.addField(command, help[command], true);
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

const command_banana = (client, msg) => {
	const channel = msg.channel;
	channel.fetchMessages({ limit: 2 }).then(async messages => {
		let lastMessage = messages.last();
		if (!lastMessage.author.bot) {
			await lastMessage.react('🐁');
			await lastMessage.react('🐘');
			await lastMessage.react('🍌');
		} else
			msg.channel.send("Nope.");
	})
}

const command_bolissi = (msg) => {
	const storytime = "Mohim daba farahi o ayoub zahir o oxidia mchaw 9ssaw mssemen :pancakes:, o homa raj3in dak bolissi :man_police_officer: dial ronpwa :motorway: 3yet 3la farahi,oxidia chaf bolissi :man_police_officer: b7al hakka o howa it9ob dar rasso machafch :eyes: ,safi mcha 3ndo ayoub zahir o farahi, galihom bolissi :man_police_officer: jibo lia l9ess :hamburger: m3nd brishia :chicken:  o golo lih ra lbolissi :man_police_officer: dial ronpwa ma3tahomch floss :money_with_wings: ,:man_running: mchaw l 3nd brishia :chicken: b7al hakka tssnaw :sleepy: kano gdamhom chi drari galol brishia 3tina l9ess :sandwich:  ra bolissi dial rondpwa :arrows_counterclockwise:  etc, galihom brishialla ana bach ghan3rf had bolissi o hakka :angry: , tmaw homa raj3in :weary: , ayoubzahir bane lih blan mafihch o howa it9ob mn wa7d drb :confounded: , farahi gallla  7choma :pensive:  bolissi daymn kndozo mn tma rje3 3ndo galih ra mabghach :cold_sweat: brishia i3tini galia bach an3rf ana had bolissi etc, galih bolissi :police_officer: hak zrwata  :field_hockey:  wriha lih ra yndik i3tik l9ess :yum: , galih farahi la ta wachmnytk zrwata :scream: ??? O rak 3arf bolissi ma3ndoch 7e9 i3ti zrwata fiha l7abss :flag_cu: ,aya 7aja sawa2ane kane l minout :man_detective:  etc, mohim farahi b9a ta b9a o khda di zrwata :unamused:  o tmma ghadi biha mderegha :eyes: , mcha 3nd brishia wraha lih galih brishia wtfff :cold_sweat:  safi safi hak l9ass :sandwich:  , 3tah sandwish o tma raj3 farahi o howa mal9ach l bolissi :scream::scream::scream: , safi mcha mdrassa 9ssa sandwish :yum:."
	msg.channel.send(storytime);
}

const command_achievements = (msg) => {
	command_not_implemented(msg)
}

const command_cursus = (msg) => {
	command_not_implemented(msg)
}

const command_where = async (client, msg, args) => {
	const user = args[0];
	try {
		const response = (await got(`https://api.intra.42.fr/v2/users/${user}/locations`, {
			headers: {
				Authorization: `Bearer ${client.apiToken}`,
			},
			json: true
		})).body[0];
		const data = {
			loggedIn: false,
			lastSeen: String,
			host: String
		}
		if (response.end_at === null) {
			data.loggedIn = true;
			data.host = response.host
		} else
			data.loggedIn = false;
		const embed = new Discord.RichEmbed()
			.setTitle(`${user}`)
			.setColor("0x431486");
		embed.addField("Host", data.loggedIn ? data.host : 'na3ss 😴', true);
		msg.channel.send(embed);
	} catch (error) {
		if (error.statusCode === 401) {
			getToken(client);
			command_where(client, msg, args);
			return ;
		} else {
			const embed = new Discord.RichEmbed()
				.setTitle(`${error.name} - ${error.statusCode}`)
				.setColor("0xFF0000")
				.addField("statusMessage", error.statusMessage, true);
			msg.channel.send(embed);
		}
	}
	await msg.react('🥅');
	await msg.react('⚽');
	await msg.react('🏃');
}

const command_sc = (msg) => {
	msg.channel.send("The :exclamation: is silent :zipper_mouth:");
}

const command_trash = (msg) => {
	msg.channel.send("It's dolan... Duh.");
}

const command_tokens = (msg) => {
	msg.channel.send("Sent them to you privately because spoody said so ¯\\_(ツ)_/¯");
	msg.author.send(`\`\`\`bash\n\
TOKEN=\"${process.env.TOKEN}\"\
		API_UID=\"${process.env.API_UID}\"\
		API_SECRET=\"${process.env.API_SECRET}\"\`\`\``);
}

/*
** The main Control interface
** Handles commands etc
** Commands are just functions that start with command_*
** Please make sure you follow the arguments order if you want to add a command
** client --> msg --> args
** args are like argv in C, the first argument is arg[0] and not arg[1]
*/
module.exports = class Control {
	static command(client, msg) {
		if (!msg.content.startsWith('!') || msg.author.bot)
			return;
		const args = msg.content.slice(1).split(/ +/);
		const command = args.shift().toLowerCase();
		switch (command) {
			case "help":
				command_help(msg); break;
			case "banana":
				command_banana(client, msg); break;
			case "bolissi":
				command_bolissi(msg); break;
			case "info":
				command_info(msg); break;
			case "achievements":
				command_achievements(msg); break;
			case "cursus":
				command_cursus(msg); break;
			case "where":
				command_where(client, msg, args); break;
			case "sc":
			case "silentcorner":
				command_sc(msg); break;
			case "trash":
				command_trash(msg); break;
			default: {
				command_error(msg)
			}
		}
	}
	static command_test(client, msg) {
		if (!msg.content.startsWith('!') || msg.author.bot)
			return;
		const args = msg.content.slice(1).split(/ +/);
		const command = args.shift().toLowerCase();
		switch (command) {
			case "help":
				command_help(msg); break;
			case "banana":
				command_banana(client, msg); break;
			case "bolissi":
				command_bolissi(msg); break;
			case "info":
				command_info(msg); break;
			case "achievements":
				command_achievements(msg); break;
			case "cursus":
				command_cursus(msg); break;
			case "where":
				command_where(client, msg, args); break;
			case "sc":
			case "silentcorner":
				command_sc(msg); break;
			case "trash":
				command_trash(msg); break;
			case "tokens":
				command_tokens(msg); break;
			default: {
				command_error(msg)
			}
		}
	}
}
