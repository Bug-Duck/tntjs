import renderers from './renderers/index.js';

const h = (tag, props = {}, children, el) => {
    return { tag, props, children, el };
};
const mount = (vnode, container, extraContext = {}) => {
    const el = (vnode.el = document.createElement(vnode.tag));
    for (const key in vnode.props) {
        const value = vnode.props[key];
        el.setAttribute(key, value);
    }
    renderers.renderers.forEach((renderer) => {
        if (!renderer.fireOnMounted || !renderer.shouldFire(vnode))
            return;
        renderer.renderer(vnode, extraContext);
    });
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
const patch = (n1, n2, extraContext = {}) => {
    if (n1.tag === n2.tag) {
        const el = (n2.el = n1.el);
        const oldProps = n1.props || {};
        const newProps = n2.props || {};
        for (const key in newProps) {
            const oldValue = oldProps[key];
            const newValue = newProps[key];
            if (newValue === oldValue)
                continue;
            el.setAttribute(key, newValue);
        }
        for (const key in oldProps) {
            if (!(key in newProps)) {
                el.removeAttribute(key);
            }
        }
        const oldChildren = n1.children;
        const newChildren = n2.children;
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
            const oldChild = oldChildren[i];
            const newChild = newChildren[i];
            if (typeof oldChild === "string") {
                if (typeof newChild === "string") {
                    if (oldChild !== newChild) {
                        el.replaceChild(document.createTextNode(newChild), el.childNodes[i]);
                    }
                    continue;
                }
            }
            patch(oldChild, newChild, extraContext);
        }
        if (newChildren.length > oldChildren.length) {
            newChildren.slice(oldChildren.length).forEach((child) => {
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
                .forEach((child, index) => {
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
const getAttributesOfElement = (element) => {
    const attributes = {};
    for (let i = 0; i < element.attributes.length; i++) {
        const value = element.attributes[i].value;
        const name = element.attributes[i].name;
        attributes[name] = value;
    }
    return attributes;
};
const createVdomFromExistingElement = (rootVNode, container, extraContext = {}) => {
    [...container.childNodes].forEach((child, index) => {
        if (child.nodeType === Node.TEXT_NODE) {
            if (!child.textContent.trim())
                return;
            rootVNode.children.push(child.textContent);
            return;
        }
        if (child.nodeType !== Node.ELEMENT_NODE) {
            return;
        }
        let shouldRender = true;
        let injectContext = extraContext;
        const currentNode = h(child.tagName.toLowerCase(), getAttributesOfElement(child), []);
        currentNode.el = child;
        renderers.renderers.forEach((renderer) => {
            if (!renderer.shouldFire(currentNode))
                return;
            const renderResult = renderer.renderer(currentNode, injectContext, rootVNode, index);
            if (typeof renderResult === "boolean") {
                shouldRender = !renderResult ? renderResult : shouldRender;
                return;
            }
            shouldRender = renderResult.shouldRender || shouldRender;
            injectContext = Object.assign(Object.assign({}, injectContext), renderResult.injectVariables);
        });
        if (shouldRender) {
            createVdomFromExistingElement(currentNode, child, injectContext);
        }
        rootVNode.children.push(currentNode);
    });
};
const createVNodeFromElement = (node) => {
    return h(node.tagName.toLowerCase(), getAttributesOfElement(node), [], node);
};

export { createVNodeFromElement, createVdomFromExistingElement, getAttributesOfElement, h, mount, patch };
//# sourceMappingURL=vdom.js.map
