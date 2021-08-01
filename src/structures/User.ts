import { APIUser, Snowflake, UserFlags, UserPremiumType } from "discord-api-types";
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

    constructor(data: APIUser, id: Snowflake) {
        super(id);

        this.bot = !!data.bot;
        this.discriminator = data.discriminator;
        this.id = data.id;
        this.premiumType = data.premium_type;
        this.publicFlags = data.public_flags;
        this.isSystem = !!data.system;
        this.username = data.username;
        this.isVerified = !!data.verified;
    }
}
