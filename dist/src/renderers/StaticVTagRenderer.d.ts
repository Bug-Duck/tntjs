import { SymbolTable } from "runtime/SymbolTable";
import { Renderer } from "./index";
export default class StaticVTagRenderer implements Renderer {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: (vTagContent: string) => string);
    render(): void;
}
