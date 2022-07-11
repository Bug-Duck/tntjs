export const generateId = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

export const getParentNodes = (child: Element) => {
  let parentNode = child.parentElement;
  const parentNodes: Element[] = [];
  while (parentNode !== null) {
    parentNodes.push(parentNode);
    parentNode = parentNode.parentElement;
  }
  return parentNodes;
};

export const removeNodesWithParents = (tags: Element[], ignoreParents: string[]) => {
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
