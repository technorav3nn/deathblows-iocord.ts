import {
    APIApplicationCommandInteractionData,
    InteractionType,
    Snowflake,
} from "discord-api-types";
import Guild from "../structures/Guild";
import { GuildMember } from "../structures/GuildMember";
import Message from "../structures/Message";
import { User } from "../structures/User";
import IInteractionRes from "./IInteractionRes";

export default interface ISlashCommandInteractionRes extends IInteractionRes {
    type: InteractionType;
    member: GuildMember;
    id: Snowflake;
    guild: Guild;
    data: APIApplicationCommandInteractionData;
    name: string;
    description?: string;
    application: { id: Snowflake; token: string };
    user: User;
    reply?: any;
}
