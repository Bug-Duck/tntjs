/**
 * file: TypeInfo.ts
 * creator: 27Onion
 * create time: May 8th, 2022, 18:00
 * description: The type class.
 */

export default class TypeInfo {
  private namespaceName: string;
  private typeName: string;
  public defaultValue: unknown;

  constructor(namespaceName: string, typeName: string, defaultValue: unknown) {
    this.namespaceName = namespaceName;
    this.typeName = typeName;
    this.defaultValue = defaultValue;
  }

  toString(): string {
    return `${this.namespaceName}:type.${this.typeName}`;
  }

  get name(): string {
    return this.typeName;
  }

  get owner(): string {
    return this.typeName;
  }
}
