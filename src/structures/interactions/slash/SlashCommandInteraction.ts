import {
    APIApplicationCommandInteractionData,
    APIApplicationCommandInteractionDataOption,
    APIApplicationCommandOption,
} from "discord-api-types";
import { Client } from "../../..";
import ISlashCommandInteractionRes from "../../../interfaces/ISlashCommandInteractionRes";
import Interaction from "../Interaction";
import WebhookClient from "../WebhookClient";
import SlashCommandOptionManager from "./SlashCommandOptionManager";

export default class SlashCommandInteraction extends Interaction {
    public data: APIApplicationCommandInteractionData;

    public commandName: string;
    public commandId: `${bigint}`;
    public commandOptions: SlashCommandOptionManager;

    constructor(client: Client, data: ISlashCommandInteractionRes) {
        super(client, data);

        this.client = client;
        this.data = data;
        this.message = data.message;
        this.member = data.member;
        this.id = data.id;
        this.guild = data.guild;
        this.application = data.application;
        this.user = data.user;
        this.token = data.application.token;
        this.type = data.type;
        this.commandName = data.data.name;
        this.commandId = data.data.id;
        //@ts-ignore
        this.commandOptions = new SlashCommandOptionManager(data.data.options) ?? null;

        this.replied = false;
        this.deferred = false;

        this.webhook = new WebhookClient(client, {
            id: data.application.id,
            token: data.application.token,
        });
    }
}
