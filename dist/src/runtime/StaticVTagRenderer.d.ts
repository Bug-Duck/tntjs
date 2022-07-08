import { SymbolTable } from "./SymbolTable";
export default class StaticVTagRenderer {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: (vTagContent: string) => string);
    render(): void;
}
