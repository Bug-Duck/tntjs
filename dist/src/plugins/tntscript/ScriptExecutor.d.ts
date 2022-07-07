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
    exec(scriptContent: string, data?: SymbolTable): void;
    getFunctionParameter(reg: string, expression?: RegExp): FunctionParameterType;
    onFunction(reg: string): {
        type: string;
        value: any;
    };
    processValue(reg: string): ValueType;
    renderDOM(HTML: string, DOM: HTMLElement): void;
    evaluate(expression: string): VariableValueType;
    get innerSymbolTable(): SymbolTable;
}
