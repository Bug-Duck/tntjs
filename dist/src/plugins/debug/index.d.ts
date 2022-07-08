import { Plugin, Renderable } from "runtime/Pluggable";
export default class DebugPlugin implements Plugin {
    #private;
    get id(): string;
    get rendererList(): Renderable[];
    get tags(): string[];
    get version(): string;
    get dependencies(): string[];
    onInit(): void;
}
