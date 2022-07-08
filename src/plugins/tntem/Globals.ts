import { ObjectType, Variable, VariableValueType } from "runtime/SymbolTable";
import { Template } from "./Template";
import { Component } from "./Template";
import { SymbolTable } from "runtime/SymbolTable";

export class Globals {
  templateSymbol = new Template();
  #root: HTMLElement;
  #symbolTable: SymbolTable;

  constructor(symbolTable: SymbolTable, root: HTMLElement) {
    this.#root = root;
    this.#symbolTable = symbolTable;

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
        this.#symbolTable.setValue(traversalBody as string, new Variable(iter, ObjectType));
        // TODO: 渲染列表
      });
    }));
    // addComponents(new Component());
  }

  addComponents(component: Component) {
    this.templateSymbol[component.name] = component.exec;
  }

  render(dom) {
    for (const component in this.templateSymbol) {
      const componentDocument = this.#root.getElementsByTagName(component);
    }
  }
}
