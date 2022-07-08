/**
 * The plugin's main class.
 */

import { setValueEvaluator } from "runtime/GlobalEnvironment";
import { Plugin, Renderable } from "runtime/Pluggable";
import { SymbolTable } from "runtime/SymbolTable";
import { ScriptExecutor } from "./ScriptExecutor";
import { TagRenderer } from "./TagRenderer";

export default class TNTScriptPlugin implements Plugin {
  #executor = new ScriptExecutor();
  root: HTMLElement;
  #symbolTable: SymbolTable;

  constructor(symbolTable: SymbolTable) {
    this.#symbolTable = symbolTable;
  }

  get id(): string {
    return "tntscript";
  }

  get rendererList(): Renderable[] {
    return [new TagRenderer(this.root)];
  }

  get tags(): string[] {
    return ["tnt"];
  }

  get version(): string {
    return "v0.0.1-integrated";
  }

  get dependencies(): string[] {
    return [];
  }

  onInit(): void {
    // find all tnt tags
    this.root.querySelectorAll("tnt").forEach((tntTag) => {
      this.#executor.exec(this.#symbolTable, tntTag.getAttribute("data-original"));
    });

    setValueEvaluator((symbolTable: SymbolTable, e: string) => {
      return this.#executor.evaluate(symbolTable, e);
    });
  }
}
