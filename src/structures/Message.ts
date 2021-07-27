import { Client } from "../client/Client";
import { APIChannel, APIGuild, APIMessage, Snowflake } from "discord-api-types/v9";
import { IClient } from "../interfaces/IClient";

//import { IClient } from "../interfaces/IClient";

export default class Message {
    public client: Client;
    public channel: APIChannel;
    public guild: APIGuild;
    public content: string;
    public id: Snowflake;

    private data: APIMessage;
    public channel_id: `${bigint}`;
    public embeds: Array<object>;
    public flags: number;
    public type: number;

    constructor({ client, data }: { client: IClient; data: APIMessage }) {
        //@ts-ignore
        this.client = client;
        this.data = data;

        this.channel; // TODO
        this.id = data.id;
        this.guild; // TODO
        this.content = data.content;
        this.channel_id = data.channel_id;
        this.embeds = data.embeds;
        this.flags = data.flags;
        this.type = data.type;
    }

    async reply(options: { embeds?: Array<object>; content: string }) {
        this.client.send(this.channel_id, {
            content: options.content,
            embeds: options.embeds,
            message_reference: {
                message_id: this.id,
            },
        });
    }
}
