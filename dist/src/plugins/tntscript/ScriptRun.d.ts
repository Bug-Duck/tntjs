import { SymbolTable } from "runtime/SymbolTable";
import { ScriptExecutor } from "./ScriptExecutor";
export declare function runScriptCode(codes: any, dataObj: ScriptExecutor): SymbolTable;
export declare function init(codes: string): string[];
export declare function lineRun(code: string, dataObj: ScriptExecutor): string;
export declare function variableStatement(code: string, dataObj: ScriptExecutor): void;
export declare const renderStatement: (code: string, dataObj: any) => void;
export declare function whileStatement(code: string): void;
export declare const importCode: (code: string, dataObj: any) => void;
