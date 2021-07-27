import { Client } from "../src/index";

const client = new Client({
    token: "token",
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (message.content === "!info") {
        client.send(message.channel_id, {
            content: "\u200b",
            embeds: [
                {
                    title: "ass",
                    description: `Your name is ${message.author.username}`,
                },
            ],
        });
    }
});

client.connect();
