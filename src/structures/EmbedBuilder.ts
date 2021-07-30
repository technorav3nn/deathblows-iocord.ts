class EmbedBuilder {
    public title: string;
    public description: string;
    public color: number;

    constructor(options: { title?: string; description?: string; color?: number }) {
        this.title = options.title;
        this.description = options.description;
        this.color = options.color;
    }

    build() {
        return {
            title: this.title,
            description: this.description,
            color: this.color,
        };
    }
}

export { EmbedBuilder };
