import { SymbolTable } from "./SymbolTable";
export declare const SEPARATOR = ";";
export declare const CONNECTOR = "->";
export declare type AttributeDataCustomRendererType = (tagContent: string) => Record<string, string>;
export default class AttributeDataRenderer {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: AttributeDataCustomRendererType);
    defaultRenderer(tagContent: string): Record<string, string>;
    render(): void;
}
