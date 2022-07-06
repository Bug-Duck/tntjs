import { ObjectType, Variable, VariableValueType } from "runtime/SymbolTable";
import { Template } from "./Template";
import { Component } from "./Template";
import { Globals as GlobalEnvironment } from "runtime/GlobalEnvironment";

export class Globals {
  #templateSymbol = new Template();
  // 他妈的哪个傻逼不写注释
  constructor() {
    this.addComponents(new Component("get", (dom) => {
      const http = new XMLHttpRequest();
      http.open("GET", dom.innerHTML, true);
      http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
          dom.innerHTML = http.responseText;
        }
      };
    }));

    this.addComponents(new Component("post", (dom) => {
      const http = new XMLHttpRequest();
      http.open("POST", dom.innerHTML, true);
      http.send();
      http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
          dom.innerHTML = http.responseText;
        }
      };
    }));

    this.addComponents(new Component("if", (
      dom, 
      comparisonValue,
      condition,
      valueBeingCompared
    ) => {
      const HTMLCodes = dom.innerHTML;
      const be: Array<string> = [];
      switch (be[1]) {
      case "equals":
        if (be[0] === be[1]) { /* TODO: implement this */ }
        break;
      case "unequls":
        if (be[0] !== be[2]) { /* TODO: implement this */ }
        break;
      }
    }));
    
    this.addComponents(new Component("for", (
      dom, 
      traversalBody,
      way,
      iterateOverObject,
    ) => {
      const HTMLCodes = dom.innerHTML;
      [...iterateOverObject as unknown as VariableValueType[]].forEach((iter, key) => {
        GlobalEnvironment.symbolTable.setValue(traversalBody as string, new Variable(iter, ObjectType));
        // TODO: 渲染列表
      });
    }));
    // addComponents(new Component());
  }

  get templateSymbol() {
    return this.#templateSymbol;
  }

  set templateSymbol(value: Template) {
    this.#templateSymbol = value;
  }

  addComponents(component: Component) {
    this.#templateSymbol[component.name] = component.exec;
  }

  render(dom) {
    for (const component in this.#templateSymbol) {
      const componentDocument = document.getElementsByTagName(component);
    }
  }
}
