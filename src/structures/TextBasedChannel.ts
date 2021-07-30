import { APIChannel, RESTPostAPIChannelMessageJSONBody, Snowflake } from "discord-api-types";
import { Client } from "../client/Client";
import IoStruct from "./IoStruct";
import Message from "./Message";

export default class TextBasedChannel extends IoStruct {
    public readonly client: Client;

    public memberCount: number;
    public messageCount: number;
    public name: string;
    public isNsfw: boolean;
    public channelTopic: string;
    public type: any;
    public channelName: string;
    public guild_id: `${bigint}`;
    public data: APIChannel;

    constructor({ client, data }: { client: Client; data?: APIChannel }) {
        super(data.id);

        this.data = data;
        this.client = client;
        this.id = data.id;
        this.memberCount = data.member_count;
        this.messageCount = data.message_count;
        this.name = data.name;
        this.isNsfw = data.nsfw;
        this.channelTopic = data.topic;
        this.type = data.type;
        this.channelName = data.name;
        this.guild_id = data.guild_id;
        // TODO: ADD GUILD!
    }

    async send(...args: RESTPostAPIChannelMessageJSONBody[]) {
        const res = await this.client.send(this.id, ...args).catch(console.error);
        return res;
    }

    async getMessage(id: Snowflake) {
        return this.client.cache.messages.get(id);
    }
}
