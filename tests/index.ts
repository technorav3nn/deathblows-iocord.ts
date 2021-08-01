import { Client, EmbedBuilder } from "../src/index";
import Message from "../src/structures/Message";

const client = new Client({
    token: "ODYxMjcxNjM2OTA3OTE3MzIy.YOHXtw.u0zXrIk6LGJs-oKA_f1wMF8o8M8",
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", async (raw, message: Message) => {
    // messsage is raw api data, test is the message object
    if (raw.author.bot) return;

    if (message.content === "!getname") {
        message.reply({
            content: `${message.author.username} is your dsf! Joined server at ${new Date(
                message.member.joinedAt
            ).toLocaleDateString()}`,
        });
    }
});

function delay(ms: number) {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    });
}

client.connect();
