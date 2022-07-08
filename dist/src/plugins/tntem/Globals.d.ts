import { Template } from "./Template";
import { Component } from "./Template";
import { SymbolTable } from "runtime/SymbolTable";
export declare class Globals {
    #private;
    templateSymbol: Template;
    constructor(symbolTable: SymbolTable, root: HTMLElement);
    addComponents(component: Component): void;
    render(dom: any): void;
}
