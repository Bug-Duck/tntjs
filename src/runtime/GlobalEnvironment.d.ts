import { SymbolTable, VariableValueType } from "./SymbolTable";
import TNT from "./TNT";
import { Plugin } from "./Pluggable";
export declare class Globals {
    #private;
    static symbolTable: SymbolTable;
    static instances: TNT[];
    static valueEvaluator: (expr: string) => VariableValueType;
    static pluginList: Plugin[];
    constructor();
    static defaultValueEvaluator(expr: string): VariableValueType;
    set valueEvaluator(fn: (expr: string) => VariableValueType);
    static evaluate(expr: string): VariableValueType;
    static addPlugin(plugin: Plugin): void;
    static plug(plugin: Plugin): void;
    static getAllPlugins(): Plugin[];
    static hasPlugin(pluginId: string): boolean;
    static removePlugin(pluginId: string): void;
}
