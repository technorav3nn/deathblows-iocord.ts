import {
    APIApplicationCommandInteractionData,
    APIMessageComponentInteractionData,
    APIMessageSelectMenuInteractionData,
    ComponentType,
    InteractionType,
    RESTPostAPIChannelMessageJSONBody,
    Snowflake,
} from "discord-api-types";
import Guild from "../structures/Guild";
import { GuildMember } from "../structures/GuildMember";
import Message from "../structures/Message";
import { User } from "../structures/User";

export default interface IInteractionRes {
    componentType?: ComponentType;
    type: InteractionType;
    message?: Message;
    member: GuildMember;
    id: Snowflake;
    guild: Guild;
    data: unknown;
    application: { id: Snowflake; token: string };
    user: User;
    reply?: any;
}
