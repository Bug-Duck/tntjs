import { evaluate } from '../lib/common.js';
import { watchEffect } from '../reactivity.js';

const TAGS_WITH_CONDITION = ["t-if", "t-elif"];
const CONDITION_TAGS = ["t-if", "t-elif", "t-else"];
const ifRenderer = (currentNode, extraContext) => {
    let shouldRender = false;
    watchEffect(() => {
        const result = evaluate(currentNode.props.cond, extraContext);
        shouldRender = !!result;
        currentNode.props.rendered = shouldRender.toString();
    });
    return shouldRender;
};
const elifRenderer = (currentNode, extraContext, rootVNode, index) => {
    let shouldRender = false;
    const previousElement = rootVNode.children[rootVNode.children.length - 1];
    if (index - 1 === 0 ||
        !TAGS_WITH_CONDITION.includes(previousElement.tag) ||
        previousElement.props.rendered === "true")
        return false;
    watchEffect(() => {
        const result = evaluate(currentNode.props.cond, extraContext);
        shouldRender = !!result;
        currentNode.props.rendered = shouldRender.toString();
    });
    return shouldRender;
};
const elseRenderer = (currentNode, extraContext, rootVNode, index) => {
    let shouldRender = false;
    const previousElement = rootVNode.children[rootVNode.children.length - 1];
    if (index - 1 === 0 || !TAGS_WITH_CONDITION.includes(previousElement.tag))
        return false;
    watchEffect(() => {
        const result = evaluate(previousElement.props.cond, extraContext);
        shouldRender = !result;
        currentNode.props.rendered = shouldRender.toString();
    });
    return shouldRender;
};
const conditionRenderer = (currentNode, extraContext, rootVNode, index) => {
    let currentRenderer = null;
    if (currentNode.tag === "t-if") {
        currentRenderer = ifRenderer;
    }
    else if (currentNode.tag === "t-elif") {
        currentRenderer = elifRenderer;
    }
    else {
        currentRenderer = elseRenderer;
    }
    return currentRenderer(currentNode, extraContext, rootVNode, index);
};
const renderer = {
    renderer: conditionRenderer,
    name: "conditionRenderer",
    shouldFire(node) {
        return CONDITION_TAGS.includes(node.tag);
    },
};

export { CONDITION_TAGS, TAGS_WITH_CONDITION, renderer as default };
//# sourceMappingURL=conditionRenderer.js.map
