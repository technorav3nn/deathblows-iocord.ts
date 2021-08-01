import { Client } from "../client/Client";
import {
    APIChannel,
    APIGuild,
    APIGuildMember,
    APIMessage,
    RESTPatchAPIChannelMessageJSONBody,
    RESTPatchAPIChannelMessageResult,
    Snowflake,
} from "discord-api-types/v9";
import IoStruct from "./IoStruct";
import IoCordAPIError from "../util/IoCordAPIError";
import TextBasedChannel from "./TextBasedChannel";
import Guild from "./Guild";
import { GuildMember } from "./GuildMember";
import { User } from "./User";
//import { IClient } from "../interfaces/IClient";

export default class Message extends IoStruct {
    public client: Client;
    //public channel: TextBasedChannel;
    //public guild: Guild;
    public content: string;
    public id: Snowflake;
    //public member: GuildMember;

    private data: APIMessage;
    public channel_id: `${bigint}`;
    public embeds: Array<object>;
    public flags: number;
    public type: number;
    public author: User;

    constructor({ client, data }: { client: Client; data: APIMessage }) {
        super(data.id);

        this.client = client;
        this.data = data;

        this.id = data.id;
        this.content = data.content;
        this.channel_id = data.channel_id;
        this.embeds = data.embeds;
        this.flags = data.flags;
        this.type = data.type;

        //this.member = client.cache.members.get(data.author.id);
        this.author = new User(data.author, data.author.id);

        //this.channel =
    }

    async reply(options: { embeds?: Array<object>; content: string }) {
        const res: Message = await this.client.send(this.channel_id, {
            content: options.content,
            embeds: options.embeds,
            message_reference: {
                message_id: this.id,
            },
        });
        //const returnMsg = new Message({ client: this.client, data: res });
        return res;
    }
    async delete() {
        if (this.client.cache.messages.get(this.id).client) {
            console.log(this.client.cache.messages);
        }

        const res = await this.client.rest
            .delete(`/channels/${this.channel_id}/messages/${this.id}`)
            .catch(console.error);
        return res;
    }

    async edit(...args: RESTPatchAPIChannelMessageJSONBody[]) {
        if (!this.data.author.bot) {
            throw new IoCordAPIError(
                "Cannot edit a message that is authored / sent by another user (Edit YOUR Message)"
            );
        }

        this.client.rest.patch(
            `/channels/${this.data.channel_id}/messages/${this.data.id}`,
            ...args
        );
    }
    get channel() {
        return this.client.cache.channels.get(this.channel_id);
    }
    get guild() {
        return this.client.cache.guilds.get(this.data.guild_id);
    }
    get member() {
        return this.client.cache.members.get(this.data.author.id);
    }
}
