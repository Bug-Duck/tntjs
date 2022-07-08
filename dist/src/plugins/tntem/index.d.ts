import { Plugin } from "runtime/Pluggable";
import { Renderable } from "runtime/Pluggable";
export default class TemplateLanguagePlugin implements Plugin {
    root: HTMLElement;
    onInit(): void;
    get id(): string;
    get rendererList(): Renderable[];
    get tags(): string[];
    get version(): string;
    get dependencies(): string[];
}
