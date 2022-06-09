import { Plugin } from "runtime/Pluggable";
import { Renderable } from "runtime/Pluggable";
export declare class PluginMain implements Plugin {
    onInit(): void;
    get id(): string;
    get rendererList(): Renderable[];
    get tags(): string[];
    get version(): string;
}
