/**
 * The main symbol table.
 */

import TypeInfo from "./TypeInfo";
import { Logger } from "src/lib/logger";

// TNT types
export const StringType = new TypeInfo("tnt", "string", "");
export const NumberType = new TypeInfo("tnt", "number", 0);
export const ObjectType = new TypeInfo("tnt", "object", null);
export const BoolType = new TypeInfo("tnt", "bool", false);
export const TNTFunctionType = new TypeInfo("tnt", "function", null);
export const JSFunctionType = new TypeInfo("js", "function", () => { /**/ });
export const HTMLStringType = new TypeInfo("tnt", "html_string", "<div></div>");
export const ArrayType = new TypeInfo("tnt", "array", []);
export const TNTTypeMap = {
  string: StringType,
  number: NumberType,
  object: ObjectType,
  function: JSFunctionType,
  boolean: BoolType,
  array: ArrayType,
};

/**
 * The value type of a variable.
 */
export type VariableValueType = string | number | object | boolean | (() => unknown);

/**
 * A class represents an internal form of a tntjs variable's value.
 * Shouldn't be used directly. If you want to look for how to operate on variables, please see the class `Variable`.
 */
export class VariableBase {
  #value: VariableValueType;
  #type: TypeInfo;
  #logger: Logger;

  /**
   * Construct a variable.
   * @param {VariableValueType} value The value of the variable.
   * @param {TypeInfo} type  The type of the variable value.
   */
  constructor(value: VariableValueType, type: TypeInfo) {
    this.#validate(value, type);
    this.#value = value;
    this.#type = type;
    this.#logger = new Logger("tnt-variable");
  }

  #validate(value: VariableValueType, type: TypeInfo) {
    let expectedType = null;
    if (type === StringType && typeof value !== "string") {
      expectedType = "string";
    }
    if (type === HTMLStringType && typeof value !== "string") {
      expectedType = "string";
    }
    if (type === NumberType && typeof value !== "number") {
      expectedType = "number";
    }
    if (type === JSFunctionType && typeof value !== "function") {
      expectedType = "JavaScript function";
    }
    if (type === BoolType && typeof value !== "boolean") {
      expectedType = "boolean";
    }
    if (expectedType) throw new TypeError(`Expected ${expectedType} but got ${typeof value}.`);
  }

  /**
   * Get the wrapped value of the variable.
   */
  get value() {
    return this.#value;
  }

  /**
   * Set the value of the variable.
   */
  set value(value: VariableValueType) {
    try {
      this.#validate(value, this.#type);
    } catch (e) {
      this.#logger.error(e);
      return;
    }
    this.#value = value;
  }

  /**
   * Get the type of the variable.
   */
  get type() {
    return this.#type;
  }
}

/**
 * A symbol table.
 */
export class SymbolTable {
  #onSetValueHandlers: Array<() => void> = [];
  #content: Record<string, VariableBase> = {};

  /**
   *  Get value via the variable name.
   * 
   * @param {string} key The key of the variable.
   */
  getValue(key: string): VariableBase {
    return this.#content[key];
  }

  /**
   *  Set value by the variable name.
   * @param {string} key The key of the variable.
   * @param {VariableBase} v The value to set.
   */
  setValue(key: string, v: VariableBase): void {
    this.#content[key] = v;
    this.#onSetValueHandlers.forEach((eventHandler) => eventHandler());
  }

  /**
   * Delete a variable via the given key.
   * @param {string} key The key of the variable.
   */
  remove(key: string): void {
    delete this.#content[key];
  }

  /**
   * Register a new event handler that will be called when the value changes (to automatically update the state).
   * @param {() => void} handler The event handler..
   */
  onSetValue(handler: () => void) {
    this.#onSetValueHandlers.push(handler);
  }

  /**
   * Check if contains the variable.
   * @param {string} variableName The name of the variable.
   */
  containsVariable(variableName: string): boolean {
    return this.variableNames.indexOf(variableName) >= 0;
  }

  /**
   * Merge another symbol table into the current symbol table.
   * @param {SymbolTable} anotherTable The another table.
   * @param {(oldValue: VariableBase, newValue: VariableBase) => VariableBase} ifExists When there are keys that exist in the both 
   * symbol tables, this callback function will be called to decide which value will be finally stored into the merged table.
   */
  merge(anotherTable: SymbolTable, ifExists: (oldValue: VariableBase, newValue: VariableBase) => VariableBase): void {
    anotherTable.variableNames.forEach((variable) => {
      const newValue =
        this.containsVariable(variable) ?
          ifExists(this.getValue(variable), anotherTable.getValue(variable)) :
          anotherTable.getValue(variable);
      this.setValue(variable, newValue);
    });
  }

  /**
   * Get the names of the variables in the table.
   * @returns {string[]} An array of names of the variables in the table.
   */
  get variableNames(): string[] {
    return Object.keys(this.#content);
  }
}

/**
 * Convert the js type name to the tnt type object.
 * @param jsType The javascript type name.
 * @returns The tnt type object that represents the javascript type, or `ObjectType` by default.
 */
export function jsType2TNT(jsType: string): TypeInfo {
  if (Reflect.has(TNTTypeMap, jsType)) return TNTTypeMap[jsType];
  return ObjectType;
}
