/**
 * The global environment of the tntjs.
 */

import { SymbolTable, StringType, VariableValueType } from "./SymbolTable";
import TNT from "./TNT";
import { Plugin } from "./Pluggable";

export const TNTInstances: TNT[] = [];
export let valueEvaluator: (symbolTable: SymbolTable, expr: string) => VariableValueType;
export let pluginList: Plugin[] = [];

const escapeString = (str: string): string => {
  return str
    .replace(/[\n\r]/g, "\\n")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

export const defaultValueEvaluator = (symbolTable: SymbolTable, expr: string): VariableValueType => {
  const value = symbolTable.getValue(expr.trim());
  if (value === undefined) {
    throw TypeError(`Cannot find variable ${expr}.`);
  }
  if (value.type === StringType && typeof value.value === "string") {
    return escapeString(value.value);
  }
  return value.value;
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
