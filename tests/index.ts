import { ComponentType } from "discord-api-types";
import { Client, EmbedBuilder } from "../src/index";
import IInteractionRes from "../src/interfaces/IInteractionRes";
import ButtonComponentBuilder from "../src/structures/interactions/ButtonComponentBuilder";
import ComponentActionRowBuilder from "../src/structures/interactions/ComponentActionRowBuilder";
import Interaction from "../src/structures/interactions/Interaction";
import SelectMenuComponentBuilder from "../src/structures/interactions/SelectMenuComponentBuilder";
import Message from "../src/structures/Message";

const client = new Client({
    token: "",
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", async (raw, message: Message) => {
    // messsage is raw api data, test is the message object
    if (message.author.bot) return;

    const Row = new ComponentActionRowBuilder().addComponent(
        new ButtonComponentBuilder().setStyle(3).setLabel("ass").setCustomId("test")
    );
    const Row2 = new ComponentActionRowBuilder().addComponent(
        new SelectMenuComponentBuilder()
            .addOption({
                value: "ass",
                description: "ass ttits",
                label: "ass",
            })
            .setCustomId("ass")
    );

    if (message.content === "!test") {
        await message.channel.send({
            content: "test",
            components: [Row, Row2],
        });
    }
});

client.on("interactionCreate", async (interaction: Interaction) => {
    return interaction.reply({
        data: {
            content: "ass",
            flags: 1 << 6,
        },
        type: 4,
    });
});

function delay(ms: number) {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    });
}

client.connect();
