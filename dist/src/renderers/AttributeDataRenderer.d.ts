import { SymbolTable } from "runtime/SymbolTable";
import { Renderer } from "./index";
export declare const SEPARATOR = ";";
export declare const CONNECTOR = "->";
export declare type AttributeDataCustomRendererType = (tagContent: string) => Record<string, string>;
export default class AttributeDataRenderer implements Renderer {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: AttributeDataCustomRendererType);
    defaultRenderer(tagContent: string): Record<string, string>;
    render(): void;
}
