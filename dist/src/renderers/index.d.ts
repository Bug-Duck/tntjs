import { SymbolTable } from "runtime/SymbolTable";
import AttributeDataRenderer from "./AttributeDataRenderer";
import ForTagRenderer from "./ForTagRenderer";
import StaticVTagRenderer from "./StaticVTagRenderer";
import StyleDataRenderer from "./StyleDataRenderer";
import VTagRenderer from "./VTagRenderer";
declare const renderers: (typeof AttributeDataRenderer | typeof VTagRenderer | typeof ForTagRenderer | typeof StaticVTagRenderer | typeof StyleDataRenderer)[];
export declare type RendererType = VTagRenderer | StaticVTagRenderer | AttributeDataRenderer | StyleDataRenderer | ForTagRenderer;
export interface Renderer {
    render: () => void;
}
export interface RendererConstructor {
    new (root: HTMLElement, symbolTable: SymbolTable, customRenderer?: () => void): Renderer;
}
export default renderers;
