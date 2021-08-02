import {
    APIChannel,
    APIUser,
    RESTPostAPIChannelMessageJSONBody,
    Snowflake,
    UserFlags,
    UserPremiumType,
} from "discord-api-types";
import { Client } from "..";
import { IMessageBody } from "../interfaces/IMessageBody";
import IoStruct from "./IoStruct";

export class User extends IoStruct {
    public email: string;
    public bot: boolean;
    public discriminator: string;
    public premiumType: UserPremiumType;
    public publicFlags: UserFlags;
    public isSystem: boolean;
    public username: string;
    public isVerified: boolean;
    public client: Client;

    constructor(client: Client, data: APIUser, id: Snowflake) {
        super(id);

        this.client = client;
        this.bot = !!data.bot;
        this.discriminator = data.discriminator;
        this.id = data.id;
        this.premiumType = data.premium_type;
        this.publicFlags = data.public_flags;
        this.isSystem = !!data.system;
        this.username = data.username;
        this.isVerified = !!data.verified;
    }

    async send(...options: IMessageBody[]) {
        const res: APIChannel = await this.client.rest.post(`/users/@me/channels`, {
            recipient_id: this.id,
        });
        const createdMsg = await this.client.send(res.id, ...options);
        return createdMsg;
    }
}
