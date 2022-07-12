const TNTInstances = [];
let valueEvaluator;
let pluginList = [];
const valueEvaluationFailedMessage = "[TNT_RENDER_ERROR]";
const defaultValueEvaluator = (symbolTable, expr, ignoreVariables = []) => {
    let toEval = "try {";
    symbolTable.variableNames.forEach((variableName) => {
        if (ignoreVariables.includes(variableName))
            return;
        toEval += `const ${variableName} = ${JSON.stringify(symbolTable.getValue(variableName).value)}; `;
    });
    toEval += `return ${expr};`;
    toEval += `} catch (e) { return \`${valueEvaluationFailedMessage} \${e}\`; }`;
    try {
        return Function(toEval)();
    }
    catch (e) {
        return e;
    }
};
const setValueEvaluator = (newEvaluator) => {
    valueEvaluator = newEvaluator;
};
const evaluate = (symbolTable, expr, ignoreVariables = []) => {
    return (valueEvaluator !== null && valueEvaluator !== void 0 ? valueEvaluator : defaultValueEvaluator)(symbolTable, expr, ignoreVariables);
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

export { TNTInstances, addPlugin, defaultValueEvaluator, evaluate, getAllPlugins, hasPlugin, pluginList, removePlugin, setValueEvaluator, valueEvaluationFailedMessage, valueEvaluator };
//# sourceMappingURL=GlobalEnvironment.js.map
