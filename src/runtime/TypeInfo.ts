/**
 * The type class.
 */

import { VariableValueType } from "./SymbolTable";

/**
 * A class that used to represent a TNT type.
 */
export default class TypeInfo {
  #namespaceName: string;
  #typeName: string;
  #defaultValue: VariableValueType;

  /**
   * Construct a `TypeInfo` object.
   * @param {string} namespaceName The namespace's name.
   * @param {string} typeName The type's name.
   * @param {VariableValueType} defaultValue The default value of the type.
   */
  constructor(namespaceName: string, typeName: string, defaultValue: VariableValueType) {
    this.#namespaceName = namespaceName;
    this.#typeName = typeName;
    this.#defaultValue = defaultValue;
  }

  /**
   * Get the string representation of the type.
   * @returns {string} The string representation of the type.
   */
  toString(): string {
    return `${this.#namespaceName}:type.${this.#typeName}`;
  }

  /**
   * Get the name of the type.
   */
  get name(): string {
    return this.#typeName;
  }

  /**
   * Get the owner of the type.
   * @see TypeInfo.name
   */
  get owner(): string {
    return this.#typeName;
  }

  /**
   * Get the default value of the type.
   */
  get defaultValue(): VariableValueType {
    return this.#defaultValue;
  }

  /**
   * Set the default value of the type.
   * @param {VariableValueType} value The value to set.
   */
  set defaultValue(value: VariableValueType) {
    this.#defaultValue = value;
  }
}
