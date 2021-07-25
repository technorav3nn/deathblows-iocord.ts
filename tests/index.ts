import { Client } from "../src/index";

const client = new Client({
    token: "ODYxMjcxNjM2OTA3OTE3MzIy.YOHXtw.hHPn529Mk-WBdrSTsRpr4MQlqVQ",
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", (message) => {
    if (message.content === "ass") {
        client.send(message.channel_id, "ass!!");
    }
});

client.connect();
