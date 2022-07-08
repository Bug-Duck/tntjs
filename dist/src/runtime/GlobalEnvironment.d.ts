import { SymbolTable, VariableValueType } from "./SymbolTable";
import TNT from "./TNT";
import { Plugin } from "./Pluggable";
export declare const TNTInstances: TNT[];
export declare let valueEvaluator: (symbolTable: SymbolTable, expr: string) => VariableValueType;
export declare let pluginList: Plugin[];
export declare const defaultValueEvaluator: (symbolTable: SymbolTable, expr: string) => VariableValueType;
export declare const setValueEvaluator: (newEvaluator: (symbolTable: SymbolTable, expr: string) => VariableValueType) => void;
export declare const evaluate: (symbolTable: SymbolTable, expr: string) => VariableValueType;
export declare const addPlugin: (root: HTMLElement, plugin: Plugin) => void;
export declare const getAllPlugins: () => Plugin[];
export declare const hasPlugin: (pluginId: string) => boolean;
export declare const removePlugin: (pluginId: string) => void;