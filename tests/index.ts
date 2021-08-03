import {
    APIApplicationCommand,
    APIApplicationCommandInteraction,
    APIApplicationCommandInteractionData,
    ApplicationCommandOptionType,
    ComponentType,
    InteractionType,
    RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types";
import { Client, EmbedBuilder } from "../src/index";
import IInteractionRes from "../src/interfaces/IInteractionRes";
import ButtonComponentBuilder from "../src/structures/interactions/ButtonComponentBuilder";
import ComponentActionRowBuilder from "../src/structures/interactions/ActionRowComponentBuilder";
import Interaction from "../src/structures/interactions/Interaction";
import SelectMenuComponentBuilder from "../src/structures/interactions/SelectMenuComponentBuilder";
import Message from "../src/structures/Message";
import MessageComponentInteraction from "../src/structures/interactions/MessageComponentInteraction";
import SlashCommandInteraction from "../src/structures/interactions/slash/SlashCommandInteraction";

const client = new Client({
    token: "",
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", async (raw, message: Message) => {
    // messsage is raw api data, test is the message object
    if (message.author.bot) return;

    const Row = new ComponentActionRowBuilder().addComponents([
        new ButtonComponentBuilder().setCustomId("id1").setLabel("First").setStyle(1),
        new ButtonComponentBuilder().setCustomId("id2").setLabel("Second").setStyle(2),
        new ButtonComponentBuilder().setCustomId("id3").setLabel("Third").setStyle(3),
        new ButtonComponentBuilder().setCustomId("id4").setLabel("Foruth").setStyle(4),
    ]);

    if (message.content === "!deploy") {
        await message.channel.send({
            content: `Deploying slash commands to guild.`,
        });

        const commandData: RESTPostAPIApplicationCommandsJSONBody[] = [
            {
                name: "ping",
                description: "A simple ping pong command!",
            },
            {
                name: "say",
                description: "say something back",
                options: [
                    {
                        name: "input",
                        description: "Enter a string for me to say!",
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
        ];
        for (const command of commandData) {
            message.guild.commands.create(command);
            console.log(`Created command: ${command.name}`);
        }
    }
});

client.on("interactionCreate", async (interaction: SlashCommandInteraction) => {
    if (!interaction.isApplicationCommand()) return;

    if (interaction.commandName === "ping") {
        return await interaction.reply({
            content: `Ping! in ${(Date.now() - client.ws.lastHeartBeat) / 100}ms`,
        });
    }
    if (interaction.commandName === "say") {
        const input = interaction.commandOptions.getString("input");

        return await interaction.reply({ content: `You said:\n\`${input.value}\`` });
    }
});

function delay(ms: number) {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    });
}

client.connect();
