/**
 * The type class.
 */

export default class TypeInfo {
  #namespaceName: string;
  #typeName: string;
  #defaultValue: unknown;

  constructor(namespaceName: string, typeName: string, defaultValue: unknown) {
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

  get defaultValue(): unknown {
    return this.#defaultValue;
  }

  set defaultValue(value: unknown) {
    this.#defaultValue = value;
  }
}
