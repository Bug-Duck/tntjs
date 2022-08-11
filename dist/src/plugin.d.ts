export declare class TNTPlugin {
    name: string;
    version: string;
    onload(): void;
    render(): void;
    watchEffect(): void;
    addFunction(): Record<string, (() => any)>;
}
