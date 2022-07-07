import { Template } from "./Template";
import { Component } from "./Template";
export declare class Globals {
    #private;
    constructor();
    get templateSymbol(): Template;
    set templateSymbol(value: Template);
    addComponents(component: Component): void;
    render(dom: any): void;
}
