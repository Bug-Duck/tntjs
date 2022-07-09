import { SymbolTable } from "./SymbolTable";
export declare const SEPARATOR = ";";
export declare const CONNECTOR = "->";
export declare type TagDataCustomRendererType = (tagContent: string) => Record<string, string>;
export default class TagDataRenderer {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: TagDataCustomRendererType);
    defaultRenderer(tagContent: string): Record<string, string>;
    render(): void;
}
