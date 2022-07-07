import { SymbolTable } from "runtime/SymbolTable";
export declare class ScriptSymbolTable extends SymbolTable {
    constructor();
    print(text: string): void;
    sleep(time: number, callback?: () => void): void;
    range(startIndex: number, endIndex: number): number[];
}
export declare class Globals {
    scriptSymbolTable: ScriptSymbolTable;
}
