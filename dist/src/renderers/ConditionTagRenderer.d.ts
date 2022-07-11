import { SymbolTable } from "runtime/SymbolTable";
import { Renderer } from "./index";
export declare type ConditionTagCustomRenderer = (parentElement: Element, conditionTag: ConditionTag) => void;
export interface ConditionTagData {
    type: "if" | "elif" | "else";
    condition: string;
    children: Element[];
    show: boolean;
}
export interface ConditionTag {
    ifTag: ConditionTagData;
    elifTags: ConditionTagData[];
    elseTag?: ConditionTagData;
}
export default class ConditionTagRenderer implements Renderer {
    #private;
    constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: ConditionTagCustomRenderer);
    defaultRenderer(parentElement: Element, conditionTag: ConditionTag): void;
    render(): void;
}
