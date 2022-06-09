import { ProcessValueType } from "./ScriptExecutor";
export declare enum Tokens {
    STRING_ESCAPE = "\\",
    STRING_START = "\"",
    STRING_END = "\"",
    LINE_SEPARATOR = ";",
    LEFT_BRACKET = "{",
    RIGHT_BRACKET = "}",
    COMMA = ","
}
export interface FunctionParameterType {
    args: ProcessValueType[];
    optionalArgs: Record<string, ProcessValueType>;
}
export declare function codeSplit(code: string): string[];
export declare function codeBlock(code: string): any[];
export declare function keySearch(key: string, code: string): string;
export declare function functionSplit(code: string, original?: boolean): FunctionParameterType;
export declare function jsTypeToTNTType(TypeName: string): string;
