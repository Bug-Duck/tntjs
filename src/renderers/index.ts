import { SymbolTable } from "runtime/SymbolTable";
import AttributeDataRenderer from "./AttributeDataRenderer";
import ConditionTagRenderer from "./ConditionTagRenderer";
import ForTagRenderer from "./ForTagRenderer";
import StaticVTagRenderer from "./StaticVTagRenderer";
import StyleDataRenderer from "./StyleDataRenderer";
import VTagRenderer from "./VTagRenderer";

// Renderer list
// !!! WARNING !!!
// The order in this list will be used as the order to run or re-run renderers,
// so put new renderers with caution!
// !!! WARNING !!!
const renderers = [
  VTagRenderer,
  StaticVTagRenderer,
  ForTagRenderer,
  ConditionTagRenderer,
  AttributeDataRenderer,
  StyleDataRenderer,
];

export const ignoreRender = ["t-for"];

export type RendererType = VTagRenderer | StaticVTagRenderer | AttributeDataRenderer | StyleDataRenderer | ForTagRenderer | ConditionTagRenderer;

export interface Renderer {
  render: () => void;
}

export interface RendererConstructor {
  new(root: HTMLElement, symbolTable: SymbolTable, customRenderer?: () => void): Renderer;
}

export default renderers;
