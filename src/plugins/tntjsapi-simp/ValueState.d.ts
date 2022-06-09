import { Plugin, Renderable } from "runtime/Pluggable";
import { Variable, VariableValueType } from "runtime/SymbolTable";
import TypeInfo from "runtime/TypeInfo";
export declare class PluginMain implements Plugin {
    get id(): string;
    get rendererList(): Renderable[];
    get tags(): string[];
    get version(): string;
    onInit(): void;
}
export declare class Value {
    name: string;
    valueObject: Variable;
    constructor(name: string, type: TypeInfo);
    setValue(value: VariableValueType): Value;
    get value(): VariableValueType;
    get type(): TypeInfo;
}
