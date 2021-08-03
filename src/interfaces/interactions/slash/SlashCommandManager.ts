import {
    APIApplicationCommandGuildInteraction,
    APIApplicationCommandOption,
    RESTPostAPIApplicationCommandsJSONBody,
    RESTPostAPIApplicationCommandsResult,
    RESTPostAPIApplicationGuildCommandsResult,
    Snowflake,
} from "discord-api-types";
import { Client } from "../../..";
import { IoSet } from "../../../util/IoSet";

export default class SlashCommandManager<V> extends IoSet<Snowflake, V> {
    public client: Client;
    public guild_id: Snowflake;

    constructor(client: Client, guild_id?: Snowflake) {
        super();

        this.client = client;
        this.guild_id = guild_id;
    }

    async create(data: RESTPostAPIApplicationCommandsJSONBody) {
        if (this.guild_id) {
            const res = await this.client.rest
                .post(
                    `/applications/${this.client.application.id}/guilds/${this.guild_id}/commands`,
                    data
                )
                .catch(console.error);
            console.log(res);
            return res;
        }
    }
}
