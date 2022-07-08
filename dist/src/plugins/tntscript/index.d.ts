import { Plugin, Renderable } from "runtime/Pluggable";
import { SymbolTable } from "runtime/SymbolTable";
export default class TNTScriptPlugin implements Plugin {
    #private;
    root: HTMLElement;
    constructor(symbolTable: SymbolTable);
    get id(): string;
    get rendererList(): Renderable[];
    get tags(): string[];
    get version(): string;
    get dependencies(): string[];
    onInit(): void;
}
