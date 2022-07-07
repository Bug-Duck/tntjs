import { Plugin, Renderable } from "runtime/Pluggable";
import { Variable, VariableValueType } from "runtime/SymbolTable";
import TypeInfo from "runtime/TypeInfo";
export declare class PluginMain implements Plugin {
    get id(): string;
    get rendererList(): Renderable[];
    get tags(): string[];
    get version(): string;
    get dependencies(): string[];
    onInit(): void;
}
export declare class Value {
    #private;
    name: string;
    valueObject: Variable;
    constructor(name: string, type: TypeInfo);
    setValue(value: VariableValueType): Value;
    Delete(): void;
    get value(): VariableValueType;
    get type(): TypeInfo;
}
