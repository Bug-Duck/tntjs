import { evaluate } from "../lib/common";
import { watchEffect } from "../reactivity";
import { VNode } from "../vdom";
import { Renderer } from "./index";

/** Condition tags with `props.cond` property. */
export const TAGS_WITH_CONDITION = ["t-if", "t-elif"];
/** All condition tags, discarding its actual condition. */
export const CONDITION_TAGS = ["t-if", "t-elif", "t-else"];

/**
 * Render a `<t-if />` element.
 * This renderer will render its children if `currentNode.props.cond` returns a truthy value, not rendering otherwise.
 * @param currentNode Current node to check condition.
 * @param extraContext Some extra variable context to inject.
 * @returns Whether should continue to render currentNode's children.
 */
const ifRenderer = (currentNode: VNode, extraContext: object) => {
  let shouldRender = false;
  watchEffect(() => {
    const result = evaluate(currentNode.props.cond, extraContext);
    shouldRender = !!result;
    currentNode.props.rendered = shouldRender.toString();
  });
  return shouldRender;
};

/**
 * Render a `<t-elif />` element.
 * This renderer will only render `currentNode`'s children if its previous element sibling is a `<t-if />` or `<t-elif />`
 * and its previoud element's condition is a falsy value.
 * @param currentNode Current node to render.
 * @param extraContext Some extra variable context to inject.
 * @param rootVNode The root VNode of `currentNode`.
 * @param index The position of `currentNode` in `rootVNode.children`.
 * @returns Whether to continue to render currentNode's children nodes.
 */
const elifRenderer = (
  currentNode: VNode,
  extraContext: object,
  rootVNode: VNode,
  index: number
) => {
  let shouldRender = false;
  const previousElement = (rootVNode.children as VNode[])[
    rootVNode.children.length - 1
  ];
  if (
    index - 1 === 0 ||
    !TAGS_WITH_CONDITION.includes(previousElement.tag) ||
    previousElement.props.rendered === "true"
  )
    return false;
  watchEffect(() => {
    const result = evaluate(currentNode.props.cond, extraContext);
    shouldRender = !!result;
    currentNode.props.rendered = shouldRender.toString();
  });
  return shouldRender;
};

/**
 * Render a `<t-else />` element.
 * This renderer will only render if `currentNode`'s previous element is a valid condition element AND its condition
 * is a falsy value.
 * @param currentNode Current node to render.
 * @param extraContext Some extra context to inject.
 * @param rootVNode The root VNode of `currentNode`.
 * @param index The position of `currentNode` in `rootVNode.children`.
 * @returns Whether to continue to render currentNode's children elements.
 */
const elseRenderer = (
  currentNode: VNode,
  extraContext: object,
  rootVNode: VNode,
  index: number
) => {
  let shouldRender = false;
  const previousElement = (rootVNode.children as VNode[])[
    rootVNode.children.length - 1
  ];
  if (index - 1 === 0 || !TAGS_WITH_CONDITION.includes(previousElement.tag))
    return false;
  watchEffect(() => {
    const result = evaluate(previousElement.props.cond, extraContext);
    shouldRender = !result;
    currentNode.props.rendered = shouldRender.toString();
  });
  return shouldRender;
};

/**
 * Render condition tags.
 * This renderer will only render if the condition of current element is truthy and its corresponding builtin
 * conditions met the requirements.
 * @see {@link ifRenderer}, {@link elifRenderer}, {@link elseRenderer}
 * @param currentNode Current node to render.
 * @param extraContext Some extra context to inject.
 * @param rootVNode The root VNode of `currentNode`.
 * @param index The position of `currentNode` in `rootVNode.children`.
 * @returns Whether to continue render currentNode's children elements.
 */
const conditionRenderer = (
  currentNode: VNode,
  extraContext: object,
  rootVNode: VNode,
  index: number
) => {
  let currentRenderer = null;
  if (currentNode.tag === "t-if") {
    currentRenderer = ifRenderer;
  } else if (currentNode.tag === "t-elif") {
    currentRenderer = elifRenderer;
  } else {
    currentRenderer = elseRenderer;
  }
  return currentRenderer(currentNode, extraContext, rootVNode, index);
};

const renderer: Renderer = {
  renderer: conditionRenderer,
  name: "conditionRenderer",
  shouldFire(node) {
    return CONDITION_TAGS.includes(node.tag);
  },
};

export default renderer;
