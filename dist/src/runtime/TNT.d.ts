import { Plugin } from "./Pluggable";
import { SymbolTable } from "./SymbolTable";
export default class TNT {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable);
    disablePlugins(pluginIds: string[]): void;
    addPlugins(plugins: Plugin[]): void;
    render(): void;
}
