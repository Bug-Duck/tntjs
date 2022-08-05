import { evaluate } from '../lib/common.js';
import { watchEffect } from '../reactivity.js';

const attributeRenderer = (currentNode, extraContext) => {
    const TNT_RENDERED = "/* TNT_RENDERED */";
    const TNT_PRESERVED_PREFIX = "__tnt_";
    const specialListeners = {};
    for (const key in currentNode.props) {
        let realKey = key;
        if (realKey.startsWith(TNT_PRESERVED_PREFIX))
            realKey = realKey.slice(TNT_PRESERVED_PREFIX.length);
        if (!realKey.startsWith(":") && !realKey.startsWith("on"))
            continue;
        if (realKey.startsWith("on")) {
            if (currentNode.props[key].startsWith(TNT_RENDERED))
                continue;
            const originalKey = TNT_PRESERVED_PREFIX + realKey;
            let injectContext = "";
            for (const ctx in extraContext)
                injectContext += `const ${ctx} = ${JSON.stringify(extraContext[ctx])}; `;
            const script = `${TNT_RENDERED} with (window.data) {${injectContext}${currentNode.props[originalKey in currentNode.props ? originalKey : realKey].toString()}}`;
            specialListeners[originalKey] = currentNode.props[key];
            currentNode.el.setAttribute(realKey, script);
            currentNode.props[realKey] = script;
            continue;
        }
        if (key.startsWith(":on")) {
            console.warn("[TNT warn] Using reactive binding and event listeners at the same time will cause the program to run not as expected.", "Please extract logic or remove one of the effect bindings.");
        }
        currentNode.el.removeAttribute(key);
        watchEffect(() => {
            currentNode.el.setAttribute(key.slice(1), evaluate(currentNode.props[key], extraContext));
        });
    }
    for (const key in specialListeners) {
        currentNode.el.setAttribute(key, specialListeners[key]);
        currentNode.props[key] = specialListeners[key];
    }
    return true;
};
const renderer = {
    renderer: attributeRenderer,
    name: "attributeRenderer",
    shouldFire(node) {
        for (const key in node.props) {
            if (key.startsWith(":") || key.startsWith("on"))
                return true;
        }
        return false;
    },
};

export { renderer as default };
//# sourceMappingURL=attributeRenderer.js.map
