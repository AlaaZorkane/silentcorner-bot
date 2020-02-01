require("dotenv").config();
const control = require("./Modules/Control");
const Discord = require("discord.js");

/*
** 42 API Stuff - DO NOT EDIT
*/
const client = new Discord.Client();
const credentials = {
	client: {
		id: process.env.API_UID,
		secret: process.env.API_SECRET
	},
	auth: {
		tokenHost: 'https://api.intra.42.fr'
	}
};
const oauth2 = require('simple-oauth2').create(credentials);
const getToken = async () => {
	try {
		const result = oauth2.clientCredentials.getToken();
		const accessToken = oauth2.accessToken.create(await result);
		client.apiToken = accessToken.token.access_token;
	} catch (error) {
		console.log('[+] 42API Access Token error', error.message);
	}
}
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

// TODO: Add a channel and tag everyone when someone edits a message
const module_fjla = (newMsg) => {
	if (newMsg.content === '.') {
		newMsg.react('🍆');
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
	getToken();
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
