import { VariableBase, SymbolTable, VariableValueType } from "runtime/SymbolTable";
import TypeInfo from "runtime/TypeInfo";
import { Logger } from "lib/logger";

/**
 * A class that represents a variable.
 */
export default class Variable {

  /**
   * The name of the variable.
   */
  name: string;

  /**
   * The value of the variable.
   * @see VariableBase
   */
  variableBase: VariableBase;
  #logger = new Logger("tntjs");
  #symbolTable: SymbolTable;

  /**
   * Construct a new variable object.
   * @param symbolTable The symbol table that the variable will be added to. Notice the the variable will **not** be actually added into the symbol table and so you should do it by yourself.
   * @param name The name of the variable.
   * @param type The type of the variable. Must be one of `TNTTypes`.
   */
  constructor(symbolTable: SymbolTable, name: string, type: TypeInfo) {
    this.name = name;
    this.variableBase = new VariableBase(type.defaultValue, type);
    this.#symbolTable = symbolTable;
  }

  /**
   * Set the value of the variable.
   * @param value The value to set.
   * @returns The current instance.
   */
  setValue(value: VariableValueType): Variable {
    this.variableBase.value = value;
    this.#symbolTable.setValue(this.name, this.variableBase);
    return this;
  }

  /**
   * Delete the variable from symbol table. Notice that if somewhere has a reference to it, then it will still be able to access but it may causes some undefined behaviours.
   * Therefore, it is an **unsafe** operation.
   */
  delete(): void {
    this.#logger.debug(`Deleting variable ${this.name}...`);
    this.#symbolTable.remove(this.name);
    this.#logger.debug(`Deleted variable ${this.name}.`);
  }

  /**
   * Get the value of the variable.
   */
  get value() {
    return this.variableBase.value;
  }

  /**
   * Get the type of the variable.
   */
  get type() {
    return this.variableBase.type;
  }
}
