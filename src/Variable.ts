import { VariableBase, SymbolTable, VariableValueType } from "runtime/SymbolTable";
import TypeInfo from "runtime/TypeInfo";
import { Logger } from "lib/logger";

export default class Variable {
  name: string;
  variableBase: VariableBase;
  #logger = new Logger("tntjs");
  #symbolTable: SymbolTable;

  constructor(symbolTable: SymbolTable, name: string, type: TypeInfo) {
    this.name = name;
    this.variableBase = new VariableBase(type.defaultValue, type);
    this.#symbolTable = symbolTable;
  }

  setValue(value: VariableValueType): Variable {
    this.variableBase.value = value;
    this.#symbolTable.setValue(this.name, this.variableBase);
    return this;
  }

  delete(): void {
    this.#logger.debug(`Deleting variable ${this.name}...`);
    this.#symbolTable.remove(this.name);
    this.#logger.debug(`Deleted variable ${this.name}.`);
  }

  get value() {
    return this.variableBase.value;
  }

  get type() {
    return this.variableBase.type;
  }
}
