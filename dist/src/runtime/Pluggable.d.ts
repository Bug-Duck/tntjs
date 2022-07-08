export interface Renderable {
    root?: HTMLElement;
    render(): void;
}
export interface Plugin {
    get id(): string;
    get rendererList(): Renderable[];
    get tags(): string[];
    get version(): string;
    root?: HTMLElement;
    dependencies: string[];
    onInit(): void;
}
