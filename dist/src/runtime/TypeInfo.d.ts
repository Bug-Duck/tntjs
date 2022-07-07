import { VariableValueType } from "./SymbolTable";
export default class TypeInfo {
    #private;
    constructor(namespaceName: string, typeName: string, defaultValue: VariableValueType);
    toString(): string;
    get name(): string;
    get owner(): string;
    get defaultValue(): VariableValueType;
    set defaultValue(value: VariableValueType);
}
