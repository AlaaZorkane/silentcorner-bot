require("dotenv").config();
const Discord = require("discord.js");
const getToken = require("./utils/api");
const control = require("./modules/Control");
var store = require("./modules/Store");
const client = new Discord.Client();

/*
** Modules here!!
** Modules are just functions so add a function and its behavior then plug it in the event listener you want
*/

const module_faddoul = (msg) => {
	const lm = ['672843428383686666', '510135525169168409'];
	if (lm.includes(msg.author.id)) {
		msg.react('🍋');
	}
}

const module_fjla = (newMsg) => {
	if (newMsg.content === '.' && newMsg.channel.name != "!SilentCorner") {
		newMsg.react('🍆');
		const channel = client.channels.find(x => x.name === "fjel");
		channel.send(`🍆 in <#${newMsg.channel.id}>`);
	}
}

const module_ozaazaa = (msg) => {}

const module_mgheber = (msg) => {
	const ghbra = /(mgheber)|(ghebra)|(megheber)|(ghobra)|(ghbra)|(ghbr)|(mghebber)|(mghebr)|(mghber)|(ozaazaa)/g
	if (msg.content.match(ghbra)) {
		msg.react('672941068395872259'); // :mgheber:
	}
}

const module_recoding = (msg) => {
	const recode = /tla3.*(dir)*.*recoding[?]*|recoding[ ]*\?/g
	if (msg.content.toLowerCase().match(recode)) {
		msg.channel.send('La');
	}
}

const module_simplifier = (msg) => {
	switch (msg.content.toLowerCase()) {
		case "character linear data sequence": {
			msg.channel.send("https://en.wikipedia.org/wiki/String");
		} break;
		case "anonymous control string": {
			msg.channel.send("https://en.wikipedia.org/wiki/Command_(computing)");
		} break;
		case "linear data-reference sequence": {
			msg.channel.send("https://en.wikipedia.org/wiki/Linked_list");
		} break;
		case "anonymous strings": {
			msg.channel.send("https://en.wikipedia.org/wiki/String_literal");
		} break;
	}
}

const module_nddah = (msg) => {
	if (store.bolissiFlag && msg.content.match(/(zerwata)|(zrwata)|(zarwata)|(zarwat)|(zorwata)|(zrwatta)/g)) {
		const gifs = [
			"https://tenor.com/view/lol-risa-risitas-laught-jaja-gif-14980369",
			"https://tenor.com/view/risitas-yes-giggle-gif-13898844",
			"https://tenor.com/view/lol-risitas-haha-laught-jaja-gif-14980367",
			"https://tenor.com/view/memes-risitas-laughing-lmao-lol-gif-11500030",
			"https://tenor.com/view/risitas-el-risitas-juan-joya-borja-issou-jesus-gif-12145166"
		];
		msg.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
		store.bolissiFlag = false;
	}
}
/*
** Event handles
** Check discord's api for this
*/

client.on("ready", () => {
	getToken(client);
	if (process.env.DEV === "true")
		console.log(`[+] Bot launched in DEV MODE (Will only listen to messages in #bot-test) with tag ${client.user.tag}!`);
	else
		console.log(`[+] Bot initiated with tag ${client.user.tag}!`);
});

client.on("message", msg => {
	if (msg.author.bot)
		return ;
	if (process.env.DEV === "true") {
		// Add your modules here while testing
		if (msg.channel.name === "bot-test") {
			module_faddoul(msg);
			module_ozaazaa(msg);
			module_mgheber(msg);
			module_recoding(msg);
			module_simplifier(msg);
			module_nddah(msg);
			control.command_test(client, msg);
		}
	} else {
		// DONT ADD MODULES HERE WHILE TESTING
		// While doing a PR you should add your functionality both here and above
		// Yeah we should come up with a more elegant way but for now this will do
		if (msg.channel.name != "bot-test") {
			module_faddoul(msg);
			module_ozaazaa(msg);
			module_mgheber(msg);
			module_recoding(msg);
			module_simplifier(msg);
			module_nddah(msg);
			control.command(client, msg);
		}
	}
});

client.on("messageUpdate", (oldMsg, newMsg) => {
	if (process.env.DEV === "false")
		module_fjla(newMsg);
});

client.login(process.env.TOKEN);
