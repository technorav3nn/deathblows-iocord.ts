import { Client, EmbedBuilder } from "../src/index";
import Message from "../src/structures/Message";

const client = new Client({
    token: "",
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", async (message, test: Message) => {
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
    console.log(test);
    if (test.content === "!test") {
        await test.reply({
            content: "shitcock",
            embeds: [
                new EmbedBuilder({
                    title: "Ass shit",
                    description: "yo mama",
                    color: 984444,
                }).build(),
            ],
        });
    }
});

client.connect();
