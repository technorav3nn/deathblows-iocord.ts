import { APIGuild, Snowflake } from "discord-api-types";
import { Client } from "../client/Client";
import { IoSet } from "../util/IoSet";
import IoStruct from "./IoStruct";
import TextBasedChannel from "./TextBasedChannel";

export default class Guild extends IoStruct {
    public readonly client: Client;

    public data: APIGuild;
    public memberCount: number;
    public members: any;
    public nsfwLevel: any;
    public name: string;
    public isUserOwner: boolean;
    public ownerId: `${bigint}`;
    public totalPermissions: `${bigint}`;
    public stickers: any;
    public isGuildInOutage: boolean;
    public guildVanityUrl: string;
    public splashHash: string;
    public channels: IoSet<Snowflake, TextBasedChannel> = new IoSet();

    constructor({ client, data }: { client: Client; data: APIGuild }) {
        super(data.id);

        this.client = client;
        this.data = data;
        this.memberCount = data.member_count;
        this.members = data.members;
        this.name = data.name;
        this.nsfwLevel = data.nsfw_level;
        this.isUserOwner = data.owner;
        this.ownerId = data.owner_id;
        this.totalPermissions = data.permissions;
        this.stickers = data.stickers;
        this.isGuildInOutage = data.unavailable;
        this.guildVanityUrl = data.vanity_url_code;
        this.splashHash = data.splash;

        if (data.channels) {
            for (const channel of data.channels) {
                this.channels.set(
                    channel.id,
                    new TextBasedChannel({ client: this.client, data: channel })
                );
                this.client.cache.channels.set(
                    channel.id,
                    new TextBasedChannel({ client: this.client, data: channel })
                );
            }
        }
        //this.roles = data.roles
    }
}
