import { SymbolTable, VariableValueType } from "runtime/SymbolTable";
import { FunctionParameterType } from "./LexicalAnalysis";
export interface ValueType {
    type: string;
    value: VariableValueType;
}
export interface ProcessValueType {
    type: string;
    value: VariableValueType;
}
export declare class ScriptExecutor {
    #private;
    exec(symbolTable: SymbolTable, scriptContent: string, data?: SymbolTable): void;
    getFunctionParameter(symbolTable: SymbolTable, reg: string, expression?: RegExp): FunctionParameterType;
    onFunction(symbolTable: SymbolTable, reg: string): {
        type: string;
        value: any;
    };
    processValue(symbolTable: SymbolTable, reg: string): ValueType;
    renderDOM(HTML: string, DOM: HTMLElement): void;
    evaluate(symbolTable: SymbolTable, expression: string): VariableValueType;
    get innerSymbolTable(): SymbolTable;
}
