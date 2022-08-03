import { evaluate } from "../lib/common";
import { watchEffect } from "../reactivity";
import { VNode } from "../vdom";
import { Renderer } from "./index";

/**
 * Render attribute bindings.
 * @param currentNode Current VNode to render.
 * @param extraContext Some extra context to inject.
 * @returns Whether to continue rendering `currentNode`'s children or not.
 */
const attributeRenderer = (currentNode: VNode, extraContext: object) => {
  const TNT_RENDERED = "/* TNT_RENDERED */";
  const TNT_PRESERVED_PREFIX = "__tnt_";
  const specialListeners: Record<string, any> = {};

  for (const key in currentNode.props) {
    let realKey = key;
    if (realKey.startsWith(TNT_PRESERVED_PREFIX))
      realKey = realKey.slice(TNT_PRESERVED_PREFIX.length);
    if (!realKey.startsWith(":") && !realKey.startsWith("on")) continue;

    if (realKey.startsWith("on")) {
      if (currentNode.props[key].startsWith(TNT_RENDERED)) continue;
      const originalKey = TNT_PRESERVED_PREFIX + realKey;
      let injectContext = "";
      for (const ctx in extraContext)
        injectContext += `const ${ctx} = ${JSON.stringify(
          extraContext[ctx]
        )}; `;

      const script = `${TNT_RENDERED} with (window.data) {${injectContext}${currentNode.props[
        originalKey in currentNode.props ? originalKey : realKey
      ].toString()}}`;
      specialListeners[originalKey] = currentNode.props[key];
      currentNode.el.setAttribute(realKey, script);
      currentNode.props[realKey] = script;
      continue;
    }

    if (key.startsWith(":on")) {
      console.warn(
        "[TNT warn] Using reactive binding and event listeners at the same time will cause the program to run not as expected.",
        "Please extract logic or remove one of the effect bindings."
      );
    }
    // original attribute is no longer needed
    currentNode.el.removeAttribute(key);
    watchEffect(() => {
      currentNode.el.setAttribute(
        key.slice(1),
        evaluate(currentNode.props[key], extraContext)
      );
    });
  }
  for (const key in specialListeners) {
    currentNode.el.setAttribute(key, specialListeners[key]);
    currentNode.props[key] = specialListeners[key];
  }
  return true;
};

const renderer: Renderer = {
  renderer: attributeRenderer,
  name: "attributeRenderer",
  shouldFire(node) {
    for (const key in node.props) {
      if (key.startsWith(":") || key.startsWith("on")) return true;
    }
    return false;
  },
};

export default renderer;
