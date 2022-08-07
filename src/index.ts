import "plugins/debug";
import DebugPlugin from "plugins/debug/index";
import "plugins/tntem";
import { Plugin } from "runtime/Pluggable";
import {
  BoolType,
  HTMLStringType,
  JSFunctionType,
  jsType2TNT,
  NumberType,
  ObjectType,
  StringType,
  SymbolTable,
  TNTFunctionType,
  VariableValueType,
} from "runtime/SymbolTable";
import TNT from "runtime/TNT";
import Variable from "./Variable";

/**
 * The data types that will be used in TNTJs.  
 * Notice the `JSFunctionType` and `TNTFunctionType` are different types.
 */
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

/**
 * The properties to configure a TNTJs application.
 */
export interface TNTAppProps {
  root: HTMLElement;
  onload?: () => unknown;
  plugins?: Plugin[];
  variables: Record<string, TNTData | VariableValueType>;
}

/**
 * The class presents a TNTJs application.
 */
export class TNTApp {

  /**
   * The global symbol table of a TNTJs application.
   */
  symbolTable: SymbolTable;

  /**
   * The core of a TNT application.
   */
  TNT: TNT;

  /**
   * All global variables.
   */
  variables: Record<string, Variable>;

  /**
   * A loader that will be called when the application is loaded.
   */
  onload: (app: TNTApp) => unknown;

  #root: HTMLElement;

  #firstPlugins: Plugin[];

  /**
   * Construct a TNTJs application instance.
   * @param {TNTAppProps} props The application's properties
   * @see TNTAppProps
   */
  constructor({ root, onload, plugins, variables }: TNTAppProps) {
    this.#root = root;
    this.symbolTable = new SymbolTable();
    this.variables = {};
    this.#firstPlugins = plugins;
    this.onload =
      onload ??
      (() => {
        /* Do nothing here */
      });
    
    this.#setData(variables);
    this.#onInit();
    this.onload(this);
  }

  #isTNTData(object: any): object is TNTData {
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

  #onInit() {
    this.TNT = new TNT(this.#root, this.symbolTable, this.#firstPlugins);
    // for better experience with setting and getting variables
    this.variables = new Proxy(this.variables, {
      get(target, name: string) {
        const variable = target[name];
        if (variable) return variable.value;
        return undefined;
      },
      set(target, name: string, value: VariableValueType) {
        const variable = target[name];
        if (variable) {
          variable.setValue(value);
          return true;
        }
        return false;
      },
    });
    window["variables"] = this.variables;
    window["TNT"] = this.TNT;
    window["TNTApp"] = this;
  }

  #setData(variables: Record<string, TNTData | VariableValueType>) {
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
  }

  /**
   * Add plugins.
   * @param {Plugin[]} plugins An array of plugins' instances.
   */
  addPlugins(plugins: Plugin[]) {
    this.TNT.addPlugins(plugins);
  }

  /**
   * Remove plugins, or say, disable plugins with given ids.
   * @param {string[]} pluginIds The ids of these plugins.
   */
  removePlugins(pluginIds: string[]) {
    this.TNT.disablePlugins(pluginIds);
  }
}

/**
 * The default plugins.
 */
export const plugins = [
  DebugPlugin,
];

/**
 * All types that TNT uses.
 */
export const TNTTypes = {
  BoolType,
  HTMLStringType,
  JSFunctionType,
  NumberType,
  ObjectType,
  StringType,
  TNTFunctionType,
};
