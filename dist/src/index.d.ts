import "plugins/debug";
import "plugins/tntem";
import { Variable as VariableBase, VariableValueType } from "runtime/SymbolTable";
import TypeInfo from "runtime/TypeInfo";
import { SymbolTable } from "runtime/SymbolTable";
import TNT from "runtime/TNT";
import { NumberType, BoolType, HTMLStringType, JSFunctionType, ObjectType, StringType, TNTFunctionType } from "runtime/SymbolTable";
import { Plugin } from "runtime/Pluggable";
export declare class Variable {
    #private;
    name: string;
    variableBase: VariableBase;
    constructor(symbolTable: SymbolTable, name: string, type: TypeInfo);
    setValue(value: VariableValueType): Variable;
    delete(): void;
    get value(): VariableValueType;
    get type(): TypeInfo;
}
export interface TNTData {
    type: typeof NumberType | typeof BoolType | typeof HTMLStringType | typeof JSFunctionType | typeof StringType | typeof ObjectType | typeof TNTFunctionType;
    value: VariableValueType;
}
export default class TNTApp {
    #private;
    symbolTable: SymbolTable;
    TNT: TNT;
    variables: Record<string, Variable>;
    onload: () => unknown;
    constructor(root: HTMLElement, onload?: () => unknown);
    data(variables: Record<string, TNTData | VariableValueType>): void;
    addPlugins(plugins: Plugin[]): void;
    removePlugins(pluginIds: string[]): void;
}
export { NumberType, BoolType, HTMLStringType, JSFunctionType, ObjectType, StringType, TNTFunctionType, } from "runtime/SymbolTable";
