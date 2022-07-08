import { SymbolTable } from "./SymbolTable";
export default class VTagRenderer {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: (vTagContent: string) => string);
    defaultRenderer(s: string): string;
    render(): void;
}
