# silentcorner-bot
Discord bot for the !SilentCorner

# How to add features?
Features are just modules and modules are functions.

Make sure your function is an arrow const function otherwise it won't get merged

Your function name should be in this format to keep the consistency <code>module_*</code>

An example of a module:

```js
const module_fjla = (newMsg) => {
	if (newMsg.content === '.') {
		newMsg.react('🍆');
	}
}
```

You can also add an event listener if you have a custom module.

An example of an event listener:

```js
client.on("messageUpdate", (oldMsg, newMsg) => {
	module_fjla(newMsg);
});
```

If you have no idea how to use the discord API, check this out: https://discordjs.guide/

## Why arrow const functions?
Just to keep the consistency.

## Can I PR whatever?
Yeah sure as long as all members of the !SC review and accept your PR.

## Why the <code>ozaazaa</code> module is empty?

Ya l mgheber...

# How to test the bot?

## Setting up .env

1. `touch .env`
2. Add these to your `.env`

``` bash
TOKEN="YOUR_BOT_TOKEN"
API_UID="42_API_UID"
API_SECRET="42_API_SECRET"
DEV=true
```
3. Replace all those tokens with `!tokens` (only works in `#bot-test`)
4. `cd ${workDirectory}` and then `npm run dev`
5. Add your modules 

P.S: The bot will only listen to messages you send to `#bot-test`
