import { Renderable } from "runtime/Pluggable";
export declare class TagRenderer implements Renderable {
    root: HTMLElement;
    constructor(root: HTMLElement);
    render(): void;
}
