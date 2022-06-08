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

  constructor() {
    this.valueEvaluator = Globals.defaultValueEvaluator;
  }

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
    return this.valueEvaluator(expr);
  }

  // Add the plugin to the registry list.
  static addPlugin(plugin: Plugin): void {
    this.pluginList.push(plugin);
  }

  static plug(plugin: Plugin): void {
    this.addPlugin(plugin);
  }

  static getAllPlugins(): Plugin[] {
    return this.pluginList;
  }

  static hasPlugin(pluginId: string): boolean {
    const pluginsFound = this.pluginList.filter((plugin) => {
      return plugin.id === pluginId;
    });
    return pluginsFound.length > 0;
  }

  static removePlugin(pluginId: string): void {
    this.pluginList = this.pluginList.filter((plugin) => {
      return plugin.id !== pluginId;
    });
  }
}