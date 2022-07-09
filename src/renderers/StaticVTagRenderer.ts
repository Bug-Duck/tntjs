/**
 * Renderer for the sv tag.
 */
import { evaluate } from "runtime/GlobalEnvironment";
import { SymbolTable } from "runtime/SymbolTable";
import { Renderer } from "./index";

export default class StaticVTagRenderer implements Renderer {
  #customRenderer?: (vTagContent: string) => string;
  #renderer: (vTagContent: string) => string;
  #root: HTMLElement;
  #symbolTable: SymbolTable;

  constructor(root: HTMLElement, symbolTable: SymbolTable, customRenderer: (vTagContent: string) => string = undefined) {
    this.#customRenderer = customRenderer;
    this.#renderer = this.#customRenderer ?? this.#defaultRenderer;
    this.#root = root;
    this.#symbolTable = symbolTable;
  }

  #defaultRenderer(s: string): string {
    try {
      return `${evaluate(this.#symbolTable, s)}`;
    } catch (e) {
      return `Error while rendering element: ${e}`;
    }
  }

  render() {
    const svTags = this.#root.querySelectorAll("sv");
    svTags.forEach((tag) => {
      tag.innerHTML = this.#renderer(tag.getAttribute("data-original"));
    });
  }
}
