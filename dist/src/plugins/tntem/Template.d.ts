import { VariableValueType } from "runtime/SymbolTable";
export declare class Template {
}
export declare class Component {
    #private;
    constructor(name: string, ComponentExec: (dom: Element, ...par: VariableValueType[]) => (string | void));
    exec(dom: Element, ...par: VariableValueType[]): string | void;
    get name(): string;
    set name(value: string);
}
