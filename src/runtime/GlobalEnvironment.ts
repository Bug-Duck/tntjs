/**
 * The global environment of the tntjs.
 */

import { SymbolTable, VariableValueType } from "./SymbolTable";
import TNT from "./TNT";
import { Plugin } from "./Pluggable";

export const TNTInstances: TNT[] = [];
export let valueEvaluator: (symbolTable: SymbolTable, expr: string) => VariableValueType;
export let pluginList: Plugin[] = [];

export const defaultValueEvaluator = (symbolTable: SymbolTable, expr: string): VariableValueType => {
  let toEval = "";
  symbolTable.variableNames.forEach((variableName) => {
    toEval += `const ${variableName} = ${JSON.stringify(symbolTable.getValue(variableName).value)}; `;
  });
  toEval += expr;
  return eval(toEval);
};

export const setValueEvaluator = (newEvaluator: (symbolTable: SymbolTable, expr: string) => VariableValueType) => {
  valueEvaluator = newEvaluator;
};

export const evaluate = (symbolTable: SymbolTable, expr: string): VariableValueType => {
  return (valueEvaluator ?? defaultValueEvaluator)(symbolTable, expr);
};

export const addPlugin = (root: HTMLElement, plugin: Plugin) => {
  plugin.root = root;
  pluginList.push(plugin);
};

export const getAllPlugins = () => {
  return pluginList;
};

export const hasPlugin = (pluginId: string) => {
  const pluginsFound = pluginList.filter((plugin) => {
    return plugin.id === pluginId;
  });
  return pluginsFound.length > 0;
};

export const removePlugin = (pluginId: string) => {
  pluginList = pluginList.filter((plugin) => {
    return plugin.id !== pluginId;
  });
};
