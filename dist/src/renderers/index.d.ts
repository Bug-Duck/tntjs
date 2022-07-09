import { SymbolTable } from "runtime/SymbolTable";
import AttributeDataRenderer from "./AttributeDataRenderer";
import StaticVTagRenderer from "./StaticVTagRenderer";
import StyleDataRenderer from "./StyleDataRenderer";
import VTagRenderer from "./VTagRenderer";
declare const renderers: (typeof VTagRenderer | typeof StaticVTagRenderer | typeof AttributeDataRenderer | typeof StyleDataRenderer)[];
export declare type RendererType = VTagRenderer | StaticVTagRenderer | AttributeDataRenderer | StyleDataRenderer;
export interface Renderer {
    render: () => void;
}
export interface RendererConstructor {
    new (root: HTMLElement, symbolTable: SymbolTable, customRenderer?: () => void): Renderer;
}
export default renderers;
