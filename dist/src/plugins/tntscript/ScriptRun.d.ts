import { SymbolTable } from "runtime/SymbolTable";
import { ScriptExecutor } from "./ScriptExecutor";
export declare function runScriptCode(symbolTable: SymbolTable, codes: any, dataObj: ScriptExecutor): SymbolTable;
export declare function init(codes: string): string[];
export declare function lineRun(symbolTable: SymbolTable, code: string, dataObj: ScriptExecutor): string;
export declare function variableStatement(symbolTable: SymbolTable, code: string, dataObj: ScriptExecutor): void;
export declare const renderStatement: (code: string, dataObj: any) => void;
export declare function whileStatement(code: string): void;
export declare const importCode: (symbolTable: SymbolTable, code: string, dataObj: any) => void;
