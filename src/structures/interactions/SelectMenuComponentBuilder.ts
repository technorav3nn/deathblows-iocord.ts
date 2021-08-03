import { APISelectMenuComponent, ComponentType } from "discord-api-types";
import ISelectMenu from "../../interfaces/ISelectMenu";
import ISelectMenuOption from "../../interfaces/ISelectMenuOption";
import BaseComponent from "./BaseComponent";

export default class SelectMenuComponentBuilder extends BaseComponent {
    public disabled: boolean;
    public maxValues: number;
    public minValues: number;
    public custom_id: string;
    public placeholder: string;

    public constructor(data?: APISelectMenuComponent) {
        super(ComponentType.SelectMenu);
        if (data) {
            this.type = 3;
            this.disabled = data.disabled || false;
            this.maxValues = data.max_values || 1;
            this.minValues = data.min_values || 1;
            this.options = data.options || [];
            this.placeholder = data.placeholder || "Make a selection";
            this.custom_id = data.custom_id;
        }
    }

    addOption(opt: ISelectMenuOption) {
        this.options.push(opt);
        return this;
    }

    addOptions(opts: ISelectMenuOption[]) {
        for (const entry of opts) {
            this.addOption(entry);
        }
        return this;
    }

    setDisabled() {
        this.disabled = !!this.disabled;
        return this;
    }
    setCustomId(id: string) {
        this.custom_id = id;
        return this;
    }
}
