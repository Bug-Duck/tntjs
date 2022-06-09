export interface Renderable {
    render(): void;
}
export interface Plugin {
    get id(): string;
    get rendererList(): Renderable[];
    get tags(): string[];
    get version(): string;
    dependencies?: string[];
    onInit(): void;
}
