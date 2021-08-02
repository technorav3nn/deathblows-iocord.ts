import {
    Snowflake,
    APIApplicationCommandInteractionData,
    APIMessageComponentInteractionData,
    APIMessage,
    APIGuildMember,
    APIGuild,
    RESTPostAPIInteractionCallbackJSONBody,
    APIInteractionResponseCallbackData,
    APIInteractionResponsePong,
    APIInteractionResponseChannelMessageWithSource,
} from "discord-api-types";
import { Client } from "../..";
import IInteractionRes from "../../interfaces/IInteractionRes";
import { IMessageBody } from "../../interfaces/IMessageBody";
import Guild from "../Guild";
import { GuildMember } from "../GuildMember";
import IoStruct from "../IoStruct";
import Message from "../Message";

export default class Interaction extends IoStruct {
    public message: Message;
    public member: GuildMember;
    public guild: Guild;
    public data: APIApplicationCommandInteractionData | APIMessageComponentInteractionData;
    public application: { id: Snowflake };
    public user: import("c:/Users/User/Desktop/js-ts-stuff/discord-gateway-ts/src/structures/User").User;
    public client: Client;

    private readonly _token: string;

    constructor(client: Client, data: IInteractionRes) {
        super(data.id);

        this.client = client;
        this.message = data.message;
        this.member = data.member;
        this.id = data.id;
        this.guild = data.guild;
        this.data = data.data;
        this.application = data.application;
        this.user = data.user;
        this._token = data.application.token;
    }

    async reply(options: APIInteractionResponseChannelMessageWithSource) {
        const res = await this.client.rest
            .post(`/interactions/${this.id}/${this._token}/callback`, {
                data: options.data,
                type: options.type,
            })
            .catch(console.error);
        return res;
    }
}
