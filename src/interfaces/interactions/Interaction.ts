import {
    Snowflake,
    APIApplicationCommandInteractionData,
    APIMessageComponentInteractionData,
    APIMessage,
    APIGuildMember,
    APIGuild,
    RESTPostAPIInteractionCallbackJSONBody,
    APIInteractionResponseCallbackData,
    APIInteractionResponsePong,
    APIInteractionResponseChannelMessageWithSource,
    APIMessageSelectMenuInteractionData,
    InteractionType,
    ComponentType,
} from "discord-api-types";
import { Client } from "../..";
import IInteractionReplyOptions from "../IInteractionReplyOptions";
import IInteractionRes from "../IInteractionRes";
import { IMessageBody } from "../IMessageBody";
import IoCordAPIError from "../../util/IoCordAPIError";
import Guild from "../../structures/Guild";
import { GuildMember } from "../../structures/GuildMember";
import IoStruct from "../../structures/IoStruct";
import Message from "../../structures/Message";
import WebhookClient from "./WebhookClient";

export default class Interaction extends IoStruct {
    public message: Message;
    public member: GuildMember;
    public guild: Guild;
    public data: unknown;
    public application: { id: Snowflake };
    public user: import("c:/Users/User/Desktop/js-ts-stuff/discord-gateway-ts/src/structures/User").User;
    public client: Client;
    public webhook: WebhookClient;

    public token: string;
    public replied: boolean;
    public deferred: boolean;
    public type: InteractionType;
    public componentType: ComponentType;
    public hasSentFollowUp: boolean;

    constructor(client: Client, data: IInteractionRes) {
        super(data.id);

        this.client = client;
        this.message = data.message;
        this.member = data.member;
        this.id = data.id;
        this.guild = data.guild;
        this.data = data;
        this.application = data.application;
        this.user = data.user;
        this.token = data.application.token;
        this.type = data.type;

        this.componentType = data.componentType ?? null;
        this.replied = false;
        this.deferred = false;
        this.hasSentFollowUp = false;
        this.webhook = new WebhookClient(client, {
            id: data.application.id,
            token: data.application.token,
        });
    }

    async reply(options: IInteractionReplyOptions) {
        if (this.replied || this.deferred) {
            throw new IoCordAPIError(
                "Cannot send another reply / defer when an interaction has already been replied / deferred to. Use a follow-up to combat this."
            );
        }

        const res = await this.client.rest
            .post(`/interactions/${this.id}/${this.token}/callback`, {
                data: {
                    flags: options.ephermeral ? 1 << 6 : null,
                    ...options,
                },
                type: 4,
            })
            .catch(console.error);
        this.replied = true;
        return res;
    }

    async editReply(options: IInteractionReplyOptions) {
        if (this.replied) {
            const res = await this.webhook.editReply(options);
            return res;
        }
    }

    async followUp(options: IInteractionReplyOptions) {
        if (!this.replied) throw new IoCordAPIError("Must reply or defer before using followup");
        const res = await this.webhook.send(options);
        this.hasSentFollowUp = true;
        return res;
    }

    async editFollowUp(options: IInteractionReplyOptions) {
        if (!this.hasSentFollowUp)
            throw new IoCordAPIError("Must send a followUp message before editing one");
        const res = await this.webhook.editFollowUp(options);
        return res;
    }

    isButton() {
        return (
            InteractionType.MessageComponent === this.type &&
            ComponentType.Button === this.componentType
        );
    }

    isSelectMenu() {
        return (
            InteractionType.MessageComponent === this.type &&
            ComponentType.SelectMenu === this.componentType
        );
    }

    isMessageComponent() {
        return InteractionType.MessageComponent === this.type;
    }

    isApplicationCommand() {
        return InteractionType.ApplicationCommand === this.type;
    }
}
