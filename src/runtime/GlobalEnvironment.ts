/**
 * file: GlobalEnvironment.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 9:10
 * description: The global environment of the tntjs.
 */

import { SymbolTable, StringType, VariableValueType } from "./SymbolTable";
import TNT from "./TNT";
import { Plugin } from "./Pluggable";

export class Globals {
  static symbolTable: SymbolTable = new SymbolTable();
  static instances: TNT[] = [];
  static valueEvaluator: (expr: string) => VariableValueType;
  static pluginList: Plugin[] = [];

  static #escapeString(str: string): string {
    return str
      .replace(/[\n\r]/g, "\\n")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  static defaultValueEvaluator(expr: string): VariableValueType {
    const value = Globals.symbolTable.getValue(expr.trim());
    if (value.type === StringType && typeof value.value === "string") {
      return Globals.#escapeString(value.value);
    }
    return value.value;
  }

  set valueEvaluator(fn: (expr: string) => VariableValueType) {
    this.valueEvaluator = fn;
  }

  static evaluate(expr: string): VariableValueType {
    return (this.valueEvaluator ?? this.defaultValueEvaluator)(expr);
  }

  // Add the plugin to the registry list.
  static addPlugin(plugin: Plugin) {
    this.pluginList.push(plugin);
  }

  static plug(plugin: Plugin) {
    this.addPlugin(plugin);
  }

  static getAllPlugins() {
    return this.pluginList;
  }

  static hasPlugin(pluginId: string) {
    const pluginsFound = this.pluginList.filter((plugin) => {
      return plugin.id === pluginId;
    });
    return pluginsFound.length > 0;
  }

  static removePlugin(pluginId: string) {
    this.pluginList = this.pluginList.filter((plugin) => {
      return plugin.id !== pluginId;
    });
  }
}
