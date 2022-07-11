const generateId = () => {
    return (Math.random() + 1).toString(36).substring(7);
};
const getParentNodes = (child) => {
    let parentNode = child.parentElement;
    const parentNodes = [];
    while (parentNode !== null) {
        parentNodes.push(parentNode);
        parentNode = parentNode.parentElement;
    }
    return parentNodes;
};
const removeNodesWithParents = (tags, ignoreParents) => {
    const results = tags.filter((ifTag) => {
        const parentNodes = getParentNodes(ifTag);
        for (const parent of parentNodes) {
            if (ignoreParents.includes(parent.tagName.toLowerCase()) && !parent.getAttribute("data-rendering") && !parent.getAttribute("data-rendered")) {
                return false;
            }
        }
        return true;
    });
    return results;
};

export { generateId, getParentNodes, removeNodesWithParents };
//# sourceMappingURL=common.js.map
