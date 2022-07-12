import { Logger } from "lib/logger";
import "plugins/debug";
import "plugins/tntem";
import { Plugin } from "runtime/Pluggable";
import {
  BoolType,
  HTMLStringType,
  JSFunctionType, jsType2TNT, NumberType, ObjectType,
  StringType, SymbolTable, TNTFunctionType, Variable as VariableBase,
  VariableValueType
} from "runtime/SymbolTable";
import TNT from "runtime/TNT";
import TypeInfo from "runtime/TypeInfo";

export class Variable {
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
  onload: () => unknown;
  #root: HTMLElement;
  #initialized: boolean;

  constructor(root: HTMLElement, onload?: () => unknown) {
    this.#root = root;
    this.symbolTable = new SymbolTable();
    this.variables = {};
    this.#initialized = false;
    this.onload =
      onload ??
      (() => {
        /* */
      });
  }

  #isTNTData(object): object is TNTData {
    try {
      return "type" in object;
    } catch {
      return false;
    }
  }

  #getObjectType(object: VariableValueType) {
    if (Array.isArray(object)) return "array";
    return typeof object;
  }

  data(variables: Record<string, TNTData | VariableValueType>) {
    for (const variableName in variables) {
      const variablePre = variables[variableName];
      const variable: TNTData = this.#isTNTData(variablePre)
        ? variablePre
        : {
          value: variablePre,
          type: jsType2TNT(this.#getObjectType(variablePre)),
        };
      this.variables[variableName] = new Variable(
        this.symbolTable,
        variableName,
        variable.type
      );
      this.variables[variableName].setValue(variable.value);
    }
    if (!this.#initialized) {
      this.#initialized = true;
      this.TNT = new TNT(this.#root, this.symbolTable);
      // for better experience with setting and getting variables
      this.variables = new Proxy(this.variables, {
        get (target, name: string) {
          const variable = target[name];
          if (variable)
            return variable.value;
          return undefined;
        },
        set (target, name: string, value: VariableValueType) {
          const variable = target[name];
          if (variable) {
            variable.setValue(value);
            return true;
          }
          return false;
        }
      });
      this.onload();
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
  BoolType,
  HTMLStringType,
  JSFunctionType, NumberType, ObjectType,
  StringType,
  TNTFunctionType
} from "runtime/SymbolTable";

