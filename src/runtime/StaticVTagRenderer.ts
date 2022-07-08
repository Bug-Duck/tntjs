/**
 * file: VTagRenderer.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 8:15
 * description: Renderer for the V tag.
 */
import { evaluate } from "./GlobalEnvironment";
import { SymbolTable } from "./SymbolTable";

export default class StaticVTagRenderer {
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

