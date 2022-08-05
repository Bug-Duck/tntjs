import { evaluate } from '../lib/common.js';
import { watchEffect } from '../reactivity.js';

const variableRenderer = (currentNode, extraContext) => {
    watchEffect(() => {
        currentNode.children = [
            evaluate(currentNode.props.data, extraContext).toString(),
        ];
    });
    return true;
};
const renderer = {
    renderer: variableRenderer,
    name: "variableRenderer",
    shouldFire(node) {
        return node.tag === "v";
    },
};

export { renderer as default };
//# sourceMappingURL=variableRenderer.js.map
