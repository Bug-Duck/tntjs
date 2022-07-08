// FIXME: implement everything and check the unused variables

import { VariableValueType } from "runtime/SymbolTable";

export class Template {
  // TODO: implement this
}

export class Component {
  #name: string;

  constructor (name: string, ComponentExec: (
    dom: Element,
    ...par: VariableValueType[]
  ) => (string | void)) {
    this.#name = name;
    this.exec = ComponentExec;
  }

  exec(dom: Element, ...par: VariableValueType[]): string | void {
    // TODO: implement this
  }

  get name() {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }
}
// TODO: tntem Component in Symbol table.
// const TNTemComponentType = new TypeInfo("tnt","component",undefined);