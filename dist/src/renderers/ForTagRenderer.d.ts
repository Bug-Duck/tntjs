import { SymbolTable, VariableValueType } from "runtime/SymbolTable";
import { Renderer } from "./index";
export declare type ForTagCustomRenderer = (parentVariable: VariableValueType, localVariableName: string, childElement: Element, parentElement: Element) => string;
export declare type ParentVariableValue = VariableValueType;
export default class ForTagRenderer implements Renderer {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: ForTagCustomRenderer);
    defaultRenderer(parentVariable: VariableValueType, localVariableName: string, childElement: Element, parentElement: Element): string;
    render(): void;
}
