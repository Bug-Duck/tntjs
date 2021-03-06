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
export type VariableValueType = string | number | object | boolean | (() => unknown);

export class VariableBase {
  #value: VariableValueType;
  #type: TypeInfo;
  #logger: Logger;

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

  get value() {
    return this.#value;
  }

  set value(value: VariableValueType) {
    try {
      this.#validate(value, this.#type);
    } catch (e) {
      this.#logger.error(e);
      return;
    }
    this.#value = value;
  }

  get type() {
    return this.#type;
  }
}

export class SymbolTable {
  #onSetValueHandlers: Array<() => void> = [];
  #content: Record<string, VariableBase> = {};

  // Get value via the variable name.
  getValue(key: string): VariableBase {
    return this.#content[key];
  }

  // Set value by the variable name.
  setValue(key: string, v: VariableBase): void {
    this.#content[key] = v;
    this.#onSetValueHandlers.forEach((eventHandler) => eventHandler());
  }

  // Delete variable
  remove(key: string): void {
    delete this.#content[key];
  }

  // Register a new event handler that will be called when the value changes (to automatically update the state).
  onSetValue(handler: () => void) {
    this.#onSetValueHandlers.push(handler);
  }

  // Check if contains the variable.
  containsVariable(variableName: string): boolean {
    return this.variableNames.indexOf(variableName) >= 0;
  }

  // Merge table.
  merge(anotherTable: SymbolTable, ifExists: (oldValue: VariableBase, newValue: VariableBase) => VariableBase): void {
    anotherTable.variableNames.forEach((variable) => {
      const newValue =
        this.containsVariable(variable) ?
          ifExists(this.getValue(variable), anotherTable.getValue(variable)) :
          anotherTable.getValue(variable);
      this.setValue(variable, newValue);
    });
  }

  get variableNames(): string[] {
    return Object.keys(this.#content);
  }
}

export function jsType2TNT(jsType: string): TypeInfo {
  if (Reflect.has(TNTTypeMap, jsType)) return TNTTypeMap[jsType];
  return ObjectType;
}
