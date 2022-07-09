import { SymbolTable } from "runtime/SymbolTable";
import { Renderer } from "./index";
export declare const SEPARATOR = ";";
export declare const CONNECTOR = "->";
export declare type StyleDataCustomRendererType = (style: string) => Record<string, string>;
export default class StyleDataRenderer implements Renderer {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: StyleDataCustomRendererType);
    defaultRenderer(style: string): Record<string, string>;
    render(): void;
}
