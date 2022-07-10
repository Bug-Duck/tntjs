import TypeInfo from "./TypeInfo";
export declare const StringType: TypeInfo;
export declare const NumberType: TypeInfo;
export declare const ObjectType: TypeInfo;
export declare const BoolType: TypeInfo;
export declare const TNTFunctionType: TypeInfo;
export declare const JSFunctionType: TypeInfo;
export declare const HTMLStringType: TypeInfo;
export declare const ArrayType: TypeInfo;
export declare const TNTTypeMap: {
    string: TypeInfo;
    number: TypeInfo;
    object: TypeInfo;
    function: TypeInfo;
    boolean: TypeInfo;
    array: TypeInfo;
};
export declare type VariableValueType = string | number | object | boolean | (() => unknown);
export declare class Variable {
    #private;
    constructor(value: VariableValueType, type: TypeInfo);
    get value(): VariableValueType;
    set value(value: VariableValueType);
    get type(): TypeInfo;
}
export declare class SymbolTable {
    #private;
    getValue(key: string): Variable;
    setValue(key: string, v: Variable): void;
    remove(key: string): void;
    onSetValue(handler: () => void): void;
    containsVariable(variableName: string): boolean;
    merge(anotherTable: SymbolTable, ifExists: (oldValue: Variable, newValue: Variable) => Variable): void;
    get variableNames(): string[];
}
export declare function jsType2TNT(jsType: string): TypeInfo;
