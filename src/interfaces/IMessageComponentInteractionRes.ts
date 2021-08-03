import { APIMessageComponentInteractionData, Snowflake } from "discord-api-types";
import IInteractionRes from "./IInteractionRes";
import Guild from "../structures/Guild";
import { GuildMember } from "../structures/GuildMember";
import Message from "../structures/Message";
import { User } from "../structures/User";

export default interface IMessageComponentInteractionRes extends IInteractionRes {
    message: Message;
    member: GuildMember;
    id: Snowflake;
    guild: Guild;
    data: APIMessageComponentInteractionData;
    application: { id: Snowflake; token: string };
    user: User;
    reply?: any;
}
