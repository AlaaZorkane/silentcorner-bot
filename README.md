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
