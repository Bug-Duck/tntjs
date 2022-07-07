import { Globals } from "runtime/GlobalEnvironment";
import { Plugin, Renderable } from "runtime/Pluggable";
import { Variable, VariableValueType } from "runtime/SymbolTable";
import TypeInfo from "runtime/TypeInfo";
import { Logger } from "src/utils/logger";

export class PluginMain implements Plugin {
  get id(): string {
    return "tntjsapi-simp";
  }

  get rendererList(): Renderable[] {
    return [];
  }

  get tags(): string[] {
    return [];
  }

  get version(): string {
    return "1.0.0-integrated";
  }

  get dependencies(): string[] {
    return [];
  }

  onInit() { /* not implemented */ }
}

export class Value {
  name: string;
  valueObject: Variable;
  #logger = new Logger("tntjsapi-simp");

  constructor(name: string, type: TypeInfo) {
    this.name = name;
    this.valueObject = new Variable(type.defaultValue, type);
  }

  setValue(value: VariableValueType): Value {
    this.#logger.debug(`Setting value ${value} for variable ${this.name}...`);
    this.valueObject.value = value;
    Globals.symbolTable.setValue(this.name, this.valueObject);
    this.#logger.debug(`Set value ${value} for variable ${this.name}.`);
    return this;  // to enable chain-calls
  }

  remove(): void {
    this.#logger.debug(`Deletting variable ${this.name}...`);
    Globals.symbolTable.remove(this.name);
    this.#logger.debug(`Delete variable ${this.name}.`);
  }

  get value() {
    return this.valueObject.value;
  }

  get type() {
    return this.valueObject.type;
  }
}

Globals.plug(new PluginMain());
