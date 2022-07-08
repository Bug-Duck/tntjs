import "plugins/debug";
import "plugins/tntem";
import "plugins/tntscript";
import { Logger } from "lib/logger";
import {
  Variable as VariableBase,
  VariableValueType,
} from "runtime/SymbolTable";
import TypeInfo from "runtime/TypeInfo";
import { SymbolTable } from "runtime/SymbolTable";
import TNT from "runtime/TNT";
import {
  NumberType,
  BoolType,
  HTMLStringType,
  JSFunctionType,
  ObjectType,
  StringType,
  TNTFunctionType,
} from "runtime/SymbolTable";
import { Plugin } from "runtime/Pluggable";

class Variable {
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
    this.#logger.debug(`Setting value ${value} for variable ${this.name}...`);
    this.variableBase.value = value;
    this.#symbolTable.setValue(this.name, this.variableBase);
    this.#logger.debug(`Set value ${value} for variable ${this.name}.`);
    return this;
  }

  delete(): void {
    this.#logger.debug(`Deleting variable ${this.name}...`);
    this.#symbolTable.del(this.name);
    this.#logger.debug(`Deleted variable ${this.name}.`);
  }

  get value() {
    return this.variableBase.value;
  }

  get type() {
    return this.variableBase.type;
  }
}

export interface TNTData {
  type:
    | typeof NumberType
    | typeof BoolType
    | typeof HTMLStringType
    | typeof JSFunctionType
    | typeof StringType
    | typeof ObjectType
    | typeof TNTFunctionType;
  value: VariableValueType;
}

export default class TNTApp {
  symbolTable: SymbolTable;
  TNT: TNT;
  variables: Record<string, Variable>;
  #root: HTMLElement;

  constructor(root: HTMLElement) {
    this.#root = root;
    this.symbolTable = new SymbolTable();
    this.TNT = new TNT(this.#root, this.symbolTable);
    this.variables = {};
  }

  data(variables: Record<string, TNTData>) {
    for (const variableName in variables) {
      const variable = variables[variableName];
      this.variables[variableName] = new Variable(
        this.symbolTable,
        variableName,
        variable.type
      );
      this.variables[variableName].setValue(variable.value);
    }
  }

  addPlugins(plugins: Plugin[]) {
    this.TNT.addPlugins(plugins);
  }

  removePlugins(pluginIds: string[]) {
    this.TNT.disablePlugins(pluginIds);
  }
}

export {
  NumberType,
  BoolType,
  HTMLStringType,
  JSFunctionType,
  ObjectType,
  StringType,
  TNTFunctionType,
} from "runtime/SymbolTable";
