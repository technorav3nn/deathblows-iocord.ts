import {
    APIApplicationCommandInteractionData,
    APIMessageComponentInteractionData,
    RESTPostAPIChannelMessageJSONBody,
    Snowflake,
} from "discord-api-types";
import Guild from "../structures/Guild";
import { GuildMember } from "../structures/GuildMember";
import Message from "../structures/Message";
import { User } from "../structures/User";
import { IMessageBody } from "./IMessageBody";

export default interface IInteractionRes {
    message: Message;
    member: GuildMember;
    id: Snowflake;
    guild: Guild;
    data: APIApplicationCommandInteractionData | APIMessageComponentInteractionData;
    application: { id: Snowflake; token: string };
    user: User;
    reply?: any;
}
