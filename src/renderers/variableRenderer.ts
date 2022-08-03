import { evaluate } from "../lib/common";
import { watchEffect } from "../reactivity";
import { VNode } from "../vdom";
import { Renderer } from "./index";

/**
 * Render a variable (`<v />` tag).
 * @param currentNode Node that need to be rendered.
 * @param extraContext Some extra context to inject.
 * @returns Whether to continue render `currentNode`'s children elements.
 */
const variableRenderer = (currentNode: VNode, extraContext: object) => {
  watchEffect(() => {
    currentNode.children = [
      evaluate(currentNode.props.data, extraContext).toString(),
    ];
  });
  return true;
};

const renderer: Renderer = {
  renderer: variableRenderer,
  name: "variableRenderer",
  shouldFire(node) {
    return node.tag === "v";
  },
};

export default renderer;
