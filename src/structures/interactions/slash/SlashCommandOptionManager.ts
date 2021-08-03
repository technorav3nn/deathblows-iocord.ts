import {
    Snowflake,
    APIApplicationCommandOption,
    ApplicationCommandOptionType,
    APIApplicationCommandInteractionDataOption,
    APIApplicationCommandInteractionDataOptionWithValues,
} from "discord-api-types";
import { IoSet } from "../../../util/IoSet";

export default class SlashCommandOptionManager {
    private rawOptions: APIApplicationCommandInteractionDataOptionWithValues[];
    public options: IoSet<string, APIApplicationCommandInteractionDataOptionWithValues> =
        new IoSet();

    constructor(options: APIApplicationCommandInteractionDataOptionWithValues[]) {
        this.rawOptions = options;

        for (const option of options) {
            this.options.set(option.name, option);
        }
    }

    getString(name: string) {
        return this.options.find((option) => {
            return option.name === name && option.type === ApplicationCommandOptionType.String;
        });
    }
    getBool(name: string) {
        return this.options.find((option) => {
            return option.name === name && option.type === ApplicationCommandOptionType.Boolean;
        });
    }
    getInteger(name: string) {
        return this.options.find((option) => {
            return option.name === name && option.type === ApplicationCommandOptionType.Integer;
        });
    }
    // TODO: ADD USER, MEMBER, ETC.
}
