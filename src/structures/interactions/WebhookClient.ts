import { Snowflake } from "discord-api-types";
import { Client } from "../..";
import IInteractionReplyOptions from "../../interfaces/IInteractionReplyOptions";
import Message from "../Message";

export default class WebhookClient {
    public name: string;
    public guild_id: `${bigint}`;
    public id: `${bigint}`;
    public channel_id: `${bigint}`;
    public prevMessageId: Snowflake;

    public readonly client: Client;
    private readonly token: string;

    public constructor(
        client: Client,
        data?: {
            name?: string;
            guild_id?: Snowflake;
            id: Snowflake;
            channel_id?: Snowflake;
            token: string;
        }
    ) {
        const { name, guild_id, id, channel_id, token } = data;

        this.client = client;
        this.name = name;
        this.guild_id = guild_id;
        this.id = id;
        this.channel_id = channel_id;
        this.token = token;
    }

    async send(options: IInteractionReplyOptions) {
        if (!this.token) throw new Error("No token provided to the webhook!");

        const res = await this.client.rest.post(`/webhooks/${this.id}/${this.token}`, options);
        const msg = new Message({
            client: this.client,
            data: res,
        });
        this.prevMessageId = msg.id;
        return msg;
    }

    async editFollowUp(options: IInteractionReplyOptions) {
        const res = await this.client.rest.patch(
            `/webhooks/${this.id}/${this.token}/messages/${this.prevMessageId}`,
            options
        );

        return new Message({ client: this.client, data: res });
    }

    async editReply(options: IInteractionReplyOptions) {
        const res = await this.client.rest.patch(
            `/webhooks/${this.id}/${this.token}/messages/@original`,
            options
        );
        return res;
    }
}
