export declare class TNTPlugin {
    name: string;
    version: string;
    onload(): void;
    render(): void;
    watchEffect(): void;
    methods(): Record<string, (() => any)>;
}
