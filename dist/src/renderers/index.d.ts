import { SymbolTable } from "runtime/SymbolTable";
import AttributeDataRenderer from "./AttributeDataRenderer";
import ConditionTagRenderer from "./ConditionTagRenderer";
import ForTagRenderer from "./ForTagRenderer";
import StaticVTagRenderer from "./StaticVTagRenderer";
import StyleDataRenderer from "./StyleDataRenderer";
import VTagRenderer from "./VTagRenderer";
declare const renderers: (typeof ForTagRenderer | typeof VTagRenderer | typeof StaticVTagRenderer | typeof AttributeDataRenderer | typeof StyleDataRenderer | typeof ConditionTagRenderer)[];
export declare const ignoreRender: string[];
export declare type RendererType = VTagRenderer | StaticVTagRenderer | AttributeDataRenderer | StyleDataRenderer | ForTagRenderer | ConditionTagRenderer;
export interface Renderer {
    render: () => void;
}
export interface RendererConstructor {
    new (root: HTMLElement, symbolTable: SymbolTable, customRenderer?: () => void): Renderer;
}
export default renderers;
