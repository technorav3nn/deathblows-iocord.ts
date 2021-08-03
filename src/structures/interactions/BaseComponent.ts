import { APIMessageComponent, ComponentType } from "discord-api-types";
import ISelectMenuOption from "../../interfaces/ISelectMenuOption";

export default class BaseComponent {
    public custom_id: string;
    public type: ComponentType;
    public options: ISelectMenuOption[] = [];

    constructor(type: number, customId?: string, options?: ISelectMenuOption[]) {
        this.type = type;
        this.custom_id = customId;

        if (type === 2) {
            this.options = options;
        }
    }

    get customId() {
        return this.customId;
    }
}
