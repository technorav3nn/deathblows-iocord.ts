import {
    APIEmbed,
    APIAllowedMentions,
    APIMessageReferenceSend,
    APIActionRowComponent,
    Snowflake,
} from "discord-api-types";
import ComponentActionRowBuilder from "./interactions/ActionRowComponentBuilder";

export interface IMessageBody {
    content?: string;
    nonce?: number | string;
    tts?: boolean;
    embeds?: APIEmbed[];
    embed?: APIEmbed;
    allowed_mentions?: APIAllowedMentions;
    message_reference?: APIMessageReferenceSend;
    components?: ComponentActionRowBuilder[];
    sticker_ids?: [Snowflake] | [Snowflake, Snowflake] | [Snowflake, Snowflake, Snowflake];
}
