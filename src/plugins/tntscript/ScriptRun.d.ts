import { SymbolTable } from "runtime/SymbolTable";
export declare function runScriptCode(codes: any, dataObj: any): SymbolTable;
export declare function init(codes: string): string[];
export declare function lineRun(code: string): string;
export declare function variableStatement(code: string, dataObj: any): void;
export declare const renderStatement: (code: string, dataObj: any) => void;
export declare function whileStatement(code: string): void;
export declare const importCode: (code: string, dataObj: any) => void;
