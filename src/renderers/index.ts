import { VNode } from "../vdom";
import variableRenderer from "./variableRenderer";
import conditionRenderer from "./conditionRenderer";
import loopRenderer from "./loopRenderer";
import attributeRenderer from "./attributeRenderer";
import getRenderer from "./getRenderer";

/** Return values for rendered contents. */
export interface RenderedContent {
  /** Weather the current node should render on page. */
  shouldRender: boolean;
  /** A collection of variable values to inject into the children renderers. */
  injectVariables?: Record<string, string>;
}
/** A standard renderer model for builtin or custom renderers. */
export interface Renderer {
  /**
   * The main renderer function.
   * @param currentNode VNode to render.
   * @param extraContext Some extra variable context to render the content
   * @param rootVNode Root VNode of the currently rendering VNode.
   * @param index The current position of currentNode in rootVNode's children list.
   * @returns Whether to render currentNode's children elements if returned a boolean, higher level reference elsewise (see {@link RenderedContent}).
   */
  renderer: (
    currentNode: VNode,
    extraContext: object,
    rootVNode?: VNode,
    index?: number
  ) => boolean | RenderedContent;
  /** Name of current renderer, only for debugging purposes. */
  name: string;
  /**
   * Function to check whether current node should be called with current renderer.
   * @param node Current VNode to check.
   * @returns Whether to call current render function or not.
   */
  shouldFire: (node: VNode) => boolean;
  /** Whether current renderer should be fired on mount stage */
  fireOnMounted?: boolean;
}

const renderers: Renderer[] = [
  variableRenderer,
  conditionRenderer,
  loopRenderer,
  attributeRenderer,
  getRenderer,
];

export default {
  /** Builtin renderers. */
  renderers,
};
