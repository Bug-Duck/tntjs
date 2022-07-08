import { StringType } from './SymbolTable.js';

const TNTInstances = [];
let valueEvaluator;
let pluginList = [];
const escapeString = (str) => {
    return str
        .replace(/[\n\r]/g, "\\n")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
};
const defaultValueEvaluator = (symbolTable, expr) => {
    const value = symbolTable.getValue(expr.trim());
    if (value === undefined) {
        throw TypeError(`Cannot find variable ${expr}.`);
    }
    if (value.type === StringType && typeof value.value === "string") {
        return escapeString(value.value);
    }
    return value.value;
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
