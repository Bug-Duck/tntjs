/**
 * The type class.
 */

import { VariableValueType } from "./SymbolTable";

export default class TypeInfo {
  #namespaceName: string;
  #typeName: string;
  #defaultValue: VariableValueType;

  constructor(namespaceName: string, typeName: string, defaultValue: VariableValueType) {
    this.#namespaceName = namespaceName;
    this.#typeName = typeName;
    this.#defaultValue = defaultValue;
  }

  toString(): string {
    return `${this.#namespaceName}:type.${this.#typeName}`;
  }

  get name(): string {
    return this.#typeName;
  }

  get owner(): string {
    return this.#typeName;
  }

  get defaultValue(): VariableValueType {
    return this.#defaultValue;
  }

  set defaultValue(value: VariableValueType) {
    this.#defaultValue = value;
  }
}
