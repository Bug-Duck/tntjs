import { evaluate } from '../lib/common.js';
import { createVNodeFromElement, createVdomFromExistingElement } from '../vdom.js';
import renderers from './index.js';

const loopRenderer = (currentNode, extraContext) => {
    const expr = currentNode.props.data.split(" in ");
    const localName = expr[0].trim();
    const loopingValue = evaluate(expr[1].trim(), extraContext);
    const originalChild = currentNode.el.children[0];
    currentNode.children = [];
    for (const [index, currentData] of loopingValue.entries()) {
        const currentChild = createVNodeFromElement(originalChild);
        createVdomFromExistingElement(currentChild, currentChild.el, Object.assign(Object.assign({}, extraContext), { [localName]: currentData }));
        let shouldRender = true;
        renderers.renderers.forEach((renderer) => {
            if (!renderer.shouldFire(currentChild))
                return;
            const renderResult = renderer.renderer(currentChild, Object.assign(Object.assign({}, extraContext), { [localName]: currentData }), currentNode, index);
            if (typeof renderResult === "boolean") {
                shouldRender = !renderResult ? renderResult : shouldRender;
                return;
            }
            shouldRender = !renderResult.shouldRender
                ? renderResult.shouldRender
                : shouldRender;
        });
        if (!shouldRender)
            continue;
        currentNode.children.push(currentChild);
    }
    return false;
};
const renderer = {
    renderer: loopRenderer,
    name: "loopRenderer",
    shouldFire(node) {
        return node.tag === "t-for";
    },
};

export { renderer as default };
//# sourceMappingURL=loopRenderer.js.map
