import {
    APIBaseInteraction,
    APIInteractionResponseCallbackData,
    APIInteractionResponseChannelMessageWithSource,
    APIMessageComponentInteraction,
    APIMessageComponentInteractionData,
    ComponentType,
    GatewayInteractionCreateDispatch,
    InteractionType,
} from "discord-api-types";
import { Client } from "../..";
import IInteractionReplyOptions from "../../interfaces/IInteractionReplyOptions";
import IInteractionRes from "../../interfaces/IInteractionRes";
import IoCordAPIError from "../../util/IoCordAPIError";
import IMessageComponentInteractionRes from "../../interfaces/IMessageComponentInteractionRes";
import Interaction from "./Interaction";
import WebhookClient from "./WebhookClient";

// const a: APIBaseInteraction<InteractionType.MessageComponent, APIMessageComponentInteractionData>  = {}

export default class MessageComponentInteraction extends Interaction {
    public data: IMessageComponentInteractionRes;
    public component: APIMessageComponentInteractionData;

    public constructor(client: Client, data: IMessageComponentInteractionRes) {
        super(client, data);

        this.client = client;
        this.data = data;

        this.message = data.message;
        this.member = data.member;
        this.id = data.id;
        this.guild = data.guild;
        this.application = data.application;
        this.user = data.user;
        this.token = data.application.token;
        this.type = data.type;

        this.componentType = data.componentType;
        this.replied = false;
        this.deferred = false;

        this.webhook = new WebhookClient(client, {
            id: data.application.id,
            token: data.application.token,
        });
    }
}
