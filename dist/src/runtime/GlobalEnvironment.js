const TNTInstances = [];
let valueEvaluator;
let pluginList = [];
const defaultValueEvaluator = (symbolTable, expr) => {
    let toEval = "";
    symbolTable.variableNames.forEach((variableName) => {
        toEval += `const ${variableName} = ${JSON.stringify(symbolTable.getValue(variableName).value)}; `;
    });
    toEval += expr;
    return eval(toEval);
};
const setValueEvaluator = (newEvaluator) => {
    valueEvaluator = newEvaluator;
};
const evaluate = (symbolTable, expr) => {
    return (valueEvaluator !== null && valueEvaluator !== void 0 ? valueEvaluator : defaultValueEvaluator)(symbolTable, expr);
};
const addPlugin = (root, plugin) => {
    plugin.root = root;
    pluginList.push(plugin);
};
const getAllPlugins = () => {
    return pluginList;
};
const hasPlugin = (pluginId) => {
    const pluginsFound = pluginList.filter((plugin) => {
        return plugin.id === pluginId;
    });
    return pluginsFound.length > 0;
};
const removePlugin = (pluginId) => {
    pluginList = pluginList.filter((plugin) => {
        return plugin.id !== pluginId;
    });
};

export { TNTInstances, addPlugin, defaultValueEvaluator, evaluate, getAllPlugins, hasPlugin, pluginList, removePlugin, setValueEvaluator, valueEvaluator };
//# sourceMappingURL=GlobalEnvironment.js.map
