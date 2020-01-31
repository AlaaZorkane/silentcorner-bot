require("dotenv").config();
const control = require("./Modules/Control");
const Discord = require("discord.js");
const client = new Discord.Client();

/*
** Modules here!!
** Modules are just functions so add a function and its behavior then plug it in the event listener you want
*/

const module_faddoul = (message) => {
	const lm = ['672843428383686666', '510135525169168409'];
	if (lm.includes(message.author.id)) {
		message.react('🍋');
	}
}

const module_fjla = (newMsg) => {
	if (newMsg.content === '.') {
		newMsg.react('🍆');
	}
}

const module_ozaazaa = (message) => {}

/*
** Event handles
** Check discord's api for this
*/

client.on("ready", () => {
	console.log(`[+] Bot initiated with tag ${client.user.tag}!`);
});

client.on("message", msg => {
	module_faddoul(msg);
	module_ozaazaa(msg);
	control.command(msg);

});

client.on("messageUpdate", (oldMsg, newMsg) => {
	module_fjla(newMsg);
});

client.login(process.env.TOKEN);
