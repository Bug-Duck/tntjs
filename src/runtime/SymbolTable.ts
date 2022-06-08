/**
 * The main symbol table.
 */

import TypeInfo from "./TypeInfo";

// TNT types
export const StringType = new TypeInfo("tnt", "string", "");
export const NumberType = new TypeInfo("tnt", "number", 0);
export const ObjectType = new TypeInfo("tnt", "object", null);
export const BoolType = new TypeInfo("tnt", "bool", false);
export const TNTFunctionType = new TypeInfo("tnt", "function", null);
export const JSFunctionType = new TypeInfo("js", "function", () => { /**/ });
export const HTMLStringType = new TypeInfo("tnt", "html_string", "<div></div>");
export const TNTTypeMap = {
  string: StringType,
  number: NumberType,
  object: ObjectType,
  function: JSFunctionType,
  boolean: BoolType,
};
export type VariableValueType = string | number | object | boolean | (() => unknown);

export class Variable {
  #value: VariableValueType;
  #type: TypeInfo;

  constructor(value: VariableValueType, type: TypeInfo) {
    this.#validate(value, type);
    this.#value = value;
    this.#type = type;
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
    if (expectedType) throw new TypeError(`Expected ${expectedType} but got ${typeof value}`);
  }

  get value() {
    return this.#value;
  }

  set value(value: VariableValueType) {
    this.#validate(value, this.#type);
    this.#value = value;
  }

  get type() {
    return this.#type;
  }
}

export class SymbolTable {
  #onSetValueHandlers: Array<() => void> = [];
  #content: unknown = {};

  // Get value via the variable name.
  getValue(key: string): Variable {
    return this.#content[key];
  }

  // Set value by the variable name.
  setValue(key: string, v: Variable): void {
    this.#content[key] = v;
    this.#onSetValueHandlers.forEach((eventHandler) => eventHandler());
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
  merge(anotherTable: SymbolTable, ifExists: (oldValue: Variable, newValue: Variable) => Variable): void {
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
