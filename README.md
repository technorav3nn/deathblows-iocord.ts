
<h1 align="center">
<code>iocord.ts</code>
</h1>

<p align="center">
<em>A simple, and new way to use the Discord API</em><br><br>
<b >!!! WARNING: BOILERPLATE CODE AHEAD !!!
</p>

## Todo

- Create guild class (almost done)
- Add interactions
- More gateway events
- Efficient intent handling (no 513 lol)
- Fix some bugs
- JSDoc implementation

## Currently finished

- Replying
- Embed class
- Channel object
- Message object
- Bunch of other stuff lol

## Examples
*This isnt an actual package yet, fork the repo and try it out like this.*
```ts
import { Client, EmbedBuilder } from  "../src/index";
import  Message  from  "../src/structures/Message";

const  client = new  Client({
	token:  "token here!!!",
});

client.on("ready", () => {
	console.log("Ready!");
});
client.on("messageCreate", async (message, test: Message) => {
// messsage is raw api data, test is the message object
	if (message.author.bot) return;
	if (test.content === "!getname") {
		test.channel.send({ content:  `The channel name is ${test.channel.name}` });
	}
});
```

## Documentation

*Not finished, sorry!*
