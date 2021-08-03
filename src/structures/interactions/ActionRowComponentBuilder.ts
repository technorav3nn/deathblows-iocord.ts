import BaseComponent from "./BaseComponent";
import ButtonComponentBuilder from "./ButtonComponentBuilder";

export default class ComponentActionRowBuilder extends BaseComponent {
    public components: BaseComponent[] = [];
    public type: number;

    constructor(components?: BaseComponent[]) {
        super(1);

        this.type = 1;
        this.components = components || [];
    }

    addComponents(components: BaseComponent[]) {
        for (const component of components) {
            this.components.push(component);
        }
        return this;
    }
    addComponent(component: BaseComponent) {
        this.components.push(component);
        return this;
    }
}
