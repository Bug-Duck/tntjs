import { SymbolTable } from "runtime/SymbolTable";
import { Renderer } from "./index";
export default class VTagRenderer implements Renderer {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: (vTagContent: string) => string);
    defaultRenderer(s: string): string;
    render(): void;
}
