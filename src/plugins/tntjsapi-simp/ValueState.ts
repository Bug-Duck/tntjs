import { Globals } from "runtime/GlobalEnvironment";
import { Plugin, Renderable } from "runtime/Pluggable";
import { Variable, VariableValueType } from "runtime/SymbolTable";
import TypeInfo from "runtime/TypeInfo";

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

  onInit() { /* not implemented */ }
}

export class Value {
  name: string;
  valueObject: Variable;

  constructor(name: string, type: TypeInfo) {
    this.name = name;
    this.valueObject = new Variable(type.defaultValue, type);
  }

  setValue(value: VariableValueType): Value {
    if (Globals.hasPlugin("tntdebug")) {
      console.log(`[tntjsapi-simp] Setting value ${value} for variable ${this.name}...`);
    }
    this.valueObject.value = value;
    Globals.symbolTable.setValue(this.name, this.valueObject);
    if (Globals.hasPlugin("tntdebug")) {
      console.log(`[tntjsapi-simp] Set value ${value} for variable ${this.name}.`);
    }
    return this;  // to enable chain-calls
  }

  get value() {
    return this.valueObject.value;
  }

  get type() {
    return this.valueObject.type;
  }
}

Globals.plug(new PluginMain());
