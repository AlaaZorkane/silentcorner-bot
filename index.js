require("dotenv").config();
const control = require("./modules/Control");
const Discord = require("discord.js");
const getToken = require("./utils/api");
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
	if (newMsg.content === '.') {
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

const module_simplifier = (msg) => {
	switch (msg.content.toLowerCase()) {
		case "character linear data sequence": {
			msg.channel.send("https://en.wikipedia.org/wiki/String");
		} break;
		case "anonymous control string": {
			msg.channel.send("https://en.wikipedia.org/wiki/Command_(computing)");
		} break;
		case "linear collection of data": {
			msg.channel.send("https://en.wikipedia.org/wiki/Linked_list");
		} break;
		case "anonymous strings": {
			msg.channel.send("https://en.wikipedia.org/wiki/String_literal");
		} break;
	}
}

/*
** Event handles
** Check discord's api for this
*/

client.on("ready", () => {
	getToken(client);
	console.log(`[+] Bot initiated with tag ${client.user.tag}!`);
});

client.on("message", msg => {
	module_faddoul(msg);
	module_ozaazaa(msg);
	module_mgheber(msg);
	module_simplifier(msg);
	control.command(client, msg);
});

client.on("messageUpdate", (oldMsg, newMsg) => {
	module_fjla(newMsg);
});

client.login(process.env.TOKEN);
