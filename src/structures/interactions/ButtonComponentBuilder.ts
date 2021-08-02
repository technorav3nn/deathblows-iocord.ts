import {
    APIButtonComponent,
    APIButtonComponentWithCustomId,
    APIButtonComponentWithURL,
} from "discord-api-types";
import { Client } from "../..";
import IInteractionRes from "../../interfaces/IInteractionRes";
import BaseComponent from "./BaseComponent";

export default class ButtonComponentBuilder extends BaseComponent {
    public style: number;
    public label: string;
    public custom_id: string;
    public type: number;
    public url: string;
    public client: Client;
    public disabled: boolean;

    constructor(data?: APIButtonComponent & APIButtonComponentWithCustomId) {
        super(2);

        if (data) {
            this.type = 2;
            this.style = data.style || 2;
            this.label = data.label || null;
            this.custom_id = data.custom_id || null;
            this.disabled = data.disabled || false;
        }
    }
    setStyle(style: number) {
        this.style = style;
        return this;
    }
    setLabel(label: string) {
        this.label = label;
        return this;
    }
    setCustomId(id: string) {
        this.custom_id = id;
        return this;
    }
    onClick(cb: (interaction: IInteractionRes) => any, disposeTime: number, client: Client) {
        client.on("interactionCreate", cb);
        setTimeout(() => {
            client.removeListener("interactionCreate", cb);
        }, disposeTime);
        return this;
    }
}
