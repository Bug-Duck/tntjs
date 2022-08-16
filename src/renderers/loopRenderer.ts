import { evaluate } from "../lib/common";
import {
  createVdomFromExistingElement,
  createVNodeFromElement,
  VNode,
} from "../vdom";
import renderers, { Renderer } from "./index";

/**
 * Render a `<t-for />` loop.
 * @param currentNode Currently rendering VNode.
 * @param extraContext Some extra context to fill in to the evaluation process.
 * @returns Whether to continue rendering its children or not.
 */
const loopRenderer = (currentNode: VNode, extraContext: object) => {
  const expr = currentNode.props.data.split(" in ");
  const localName = expr[0].trim();
  const loopingValue = evaluate(expr[1].trim(), extraContext);
  const originalChild: Element = currentNode.el.children[0];
  currentNode.children = [];

  for (const [index, currentData] of loopingValue.entries()) {
    const currentChild = createVNodeFromElement(originalChild);
    // custom rendering logic
    createVdomFromExistingElement(currentChild, currentChild.el, {
      ...extraContext,
      [localName]: currentData,
    });
    let shouldRender = true;
    // FIXME: condition tags in t-for tags will not update reactively with arrays
    renderers.renderers.forEach((renderer) => {
      if (!renderer.shouldFire(currentChild)) return;
      // if (currentChild.tag === ("t-elif" || "t-else")) return;
      const renderResult = renderer.renderer(
        currentChild,
        { ...extraContext, [localName]: currentData },
        currentNode,
        index
      );
      if (typeof renderResult === "boolean") {
        shouldRender = !renderResult ? renderResult : shouldRender;
        return;
      }
      shouldRender = !renderResult.shouldRender
        ? renderResult.shouldRender
        : shouldRender;
    });
    if (!shouldRender) continue;
    (currentNode.children as VNode[]).push(currentChild);
  }

  // do not render its children since they're already rendered
  return false;
};

const renderer: Renderer = {
  renderer: loopRenderer,
  name: "loopRenderer",
  shouldFire(node) {
    return node.tag === "t-for";
  },
};

export default renderer;
