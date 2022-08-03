import renderers from "./renderers/index";

export type VNodeChild = VNode | string;

/** A Virtual Node representation. */
export interface VNode {
  /** Node tag name. */
  tag: string;
  /** Node properties */
  props: Record<string, string>;
  /** Node children */
  children: VNodeChild[];
  /** Actual element in DOM for the current VNode. */
  el: Element;
}

/**
 * Constructs a VNode.
 * @param tag Tag name.
 * @param props Tag attributes / properties.
 * @param children Tag children.
 * @param el Tag actual DOM element
 * @returns Constructed Virtual DOM Node.
 */
export const h = (
  tag: string,
  props: Record<string, string> = {},
  children: VNodeChild[],
  el?: Element
): VNode => {
  return { tag, props, children, el };
};

/**
 * Mounts a VNode to an actual DOM element.
 * @param vnode The root VNode to mount with.
 * @param container The container DOM element to contain all generated nodes.
 * @returns The container element with generated nodes appended.
 */
export const mount = (
  vnode: VNode,
  container: Element,
  extraContext: object = {}
) => {
  const el = (vnode.el = document.createElement(vnode.tag));
  // processing props
  for (const key in vnode.props) {
    const value = vnode.props[key];
    el.setAttribute(key, value);
  }
  renderers.renderers.forEach((renderer) => {
    if (!renderer.fireOnMounted || !renderer.shouldFire(vnode)) return;
    renderer.renderer(vnode, extraContext);
  });

  // processing children
  if (typeof vnode.children === "string") {
    el.textContent = vnode.children;
    container.appendChild(el);
    return;
  }
  vnode.children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
      return;
    }
    mount(child, el, extraContext);
  });
  container.appendChild(el);
  return container;
};

/**
 * Patches the current actual element to a new VNode and replace the older one.
 * Note that this function will modify the DOM.
 * @param n1 The old VNode to be replaced.
 * @param n2 The newer VNode to update the current DOM to.
 */
export const patch = (n1: VNode, n2: VNode, extraContext: object = {}) => {
  if (n1.tag === n2.tag) {
    const el = (n2.el = n1.el);
    // props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (newValue === oldValue) continue;
      el.setAttribute(key, newValue);
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    // children
    const oldChildren = n1.children;
    const newChildren = n2.children;
    const commonLength = Math.min(oldChildren.length, newChildren.length);
    for (let i = 0; i < commonLength; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];
      if (typeof oldChild === "string") {
        if (typeof newChild === "string") {
          if (oldChild !== newChild) {
            el.replaceChild(
              document.createTextNode(newChild),
              el.childNodes[i]
            );
          }
          continue;
        }
      }
      patch(oldChild as VNode, newChild as VNode, extraContext);
    }
    if (newChildren.length > oldChildren.length) {
      newChildren.slice(oldChildren.length).forEach((child: VNode) => {
        if (typeof child === "string") {
          el.appendChild(document.createTextNode(child));
          return;
        }
        mount(child, el, extraContext);
      });
      return;
    }
    if (newChildren.length < oldChildren.length) {
      oldChildren
        .slice(newChildren.length)
        .forEach((child: VNodeChild, index) => {
          if (typeof child === "string") {
            el.removeChild(el.childNodes[index]);
            return;
          }
          el.removeChild(child.el);
        });
      return;
    }
    return;
  }
  throw new Error("Replacing root elements are not supported.");
};

/**
 * Helper function to get and convert attributes from an element to use the object structure.
 * @param element The element to get attributes from.
 * @returns Attributes in a single object-like structure.
 */
export const getAttributesOfElement = (
  element: Element
): Record<string, string> => {
  const attributes = {};
  for (let i = 0; i < element.attributes.length; i++) {
    const value = element.attributes[i].value;
    const name = element.attributes[i].name;
    attributes[name] = value;
  }
  return attributes;
};

/**
 * Generates a new VNode from existing elemnt.
 * @param rootVNode The root VNode to append children to.
 * @param container The container element to generate VNodes from.
 * @param extraContext Some extra context data to pass to `evaulate()`.
 */
export const createVdomFromExistingElement = (
  rootVNode: VNode,
  container: Element,
  extraContext: object = {}
) => {
  [...container.childNodes].forEach((child: Element, index) => {
    if (child.nodeType === Node.TEXT_NODE) {
      if (!child.textContent.trim()) return;
      rootVNode.children.push(child.textContent);
      return;
    }
    // only generate text node and element node
    if (child.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    // if (child.closest("t-for")) return;
    let shouldRender = true;
    let injectContext = extraContext;
    const currentNode = h(
      child.tagName.toLowerCase(),
      getAttributesOfElement(child),
      []
    );
    currentNode.el = child;
    // fire renderers
    renderers.renderers.forEach((renderer) => {
      if (!renderer.shouldFire(currentNode)) return;
      const renderResult = renderer.renderer(
        currentNode,
        injectContext,
        rootVNode,
        index
      );
      if (typeof renderResult === "boolean") {
        shouldRender = !renderResult ? renderResult : shouldRender;
        return;
      }
      shouldRender = renderResult.shouldRender || shouldRender;
      injectContext = { ...injectContext, ...renderResult.injectVariables };
    });
    if (shouldRender) {
      createVdomFromExistingElement(currentNode, child, injectContext);
    }
    (rootVNode.children as VNode[]).push(currentNode);
  });
};

/**
 * Create a new VNode from the given element.
 * Note: this function will not generate children nodes. To include children generation,
 * please use {@link createVdomFromExistingElement}.
 * @param node Element to create VNode from.
 * @returns The generated VNode object.
 */
export const createVNodeFromElement = (node: Element): VNode => {
  return h(node.tagName.toLowerCase(), getAttributesOfElement(node), [], node);
};
