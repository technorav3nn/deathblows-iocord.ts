import { Client, EmbedBuilder } from "../src/index";
import Message from "../src/structures/Message";

const client = new Client({
    token: "",
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", async (message, test: Message) => {
    // messsage is raw api data, test is the message object
    if (message.author.bot) return;

    if (test.content === "!getname") {
        //test.reply({ content: "test" });
        //console.log(client.cache.channels.size);
        test.channel.send({ content: `The channel name is ${test.channel.name}` });
    }
});

function delay(ms: number) {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    });
}

client.connect();
