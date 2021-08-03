import {
    APIAllowedMentions,
    APIEmbed,
    APIMessageComponent,
    APIMessageComponentBaseInteractionData,
} from "discord-api-types";
import ComponentActionRowBuilder from "../structures/interactions/ActionRowComponentBuilder";

export default interface IInteractionReplyOptions {
    ephermeral?: boolean;
    content?: string;
    embeds?: APIEmbed[];
    embed?: APIEmbed;
    tts?: boolean;
    components?: ComponentActionRowBuilder[];
    flags?: number;
    allowedMentions?: APIAllowedMentions;
}
