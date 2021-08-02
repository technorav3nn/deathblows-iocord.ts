import { APIPartialEmoji } from "discord-api-types";

export default interface ISelectMenuData {
    label: string;
    value: string;
    description?: string;
    emoji?: APIPartialEmoji;
    default?: boolean;
}
