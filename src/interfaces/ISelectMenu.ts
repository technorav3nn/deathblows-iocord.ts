import { APISelectMenuOption } from "discord-api-types";

export default interface ISelectMenu {
    customId: string;
    options: APISelectMenuOption[];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;
}
