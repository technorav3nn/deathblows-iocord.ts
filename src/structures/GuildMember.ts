import { APIGuildMember, APIUser, Snowflake } from "discord-api-types";
import IoStruct from "./IoStruct";
import { User } from "./User";

export class GuildMember extends IoStruct {
    public joinedAt: string;
    public isDeaf: boolean;
    public isMuted: boolean;
    public nickname: string;
    public isPending: boolean;
    public premiumSince: string;
    public roles: `${bigint}`[];
    public data: APIGuildMember;

    constructor(data: APIGuildMember, id: Snowflake) {
        super(id);
        this.data = data;

        this.joinedAt = data.joined_at;
        this.isDeaf = data.deaf;
        this.isMuted = data.mute;
        this.nickname = data.nick;
        this.isPending = data.pending;
        this.premiumSince = data.premium_since;
        this.roles = data.roles;
    }
}
