/**
 * Renderer for the V tag.
 */

import { evaluate } from "./GlobalEnvironment";
import { SymbolTable } from "./SymbolTable";

export default class VTagRenderer {
  #customRenderer: (vTagContent: string) => string;
  #root: HTMLElement;
  #symbolTable: SymbolTable;

  constructor (root: HTMLElement, symbolTable: SymbolTable, customRenderer: (vTagContent: string) => string = undefined) {
    this.#customRenderer = customRenderer;
    this.#root = root;
    this.#symbolTable = symbolTable;
    this.defaultRenderer = this.defaultRenderer.bind(this);
  }

  defaultRenderer (s: string): string {
    try {
      return `${evaluate(this.#symbolTable, s)}`;
    } catch (e) {
      return `Error while rendering element: ${e}`;
    }
  }

  render () {
    const vTags = this.#root.querySelectorAll("v");
    const renderer = this.#customRenderer ?? this.defaultRenderer;
    vTags.forEach((tag) => {
      const rendered = tag.getAttribute("data-rendered");
      if (rendered === null) {
        // tags should always be rendered
        tag.setAttribute("data-rendered", "YES");
        tag.setAttribute("data-original", tag.getAttribute("name"));
        tag.removeAttribute("name");
        tag.innerHTML = renderer(tag.getAttribute("data-original"));
        return;
      }
      // if rendered, we should check if the tag really should be rendered or not
      // this process is called the DIFF CHECK
      const content = tag.getAttribute("data-original");
      const newlyRenderedContent = renderer(content);
      // compare if the element should be rerendered
      tag.innerHTML = tag.innerHTML !== newlyRenderedContent ?
        newlyRenderedContent :
        tag.innerHTML;
    });
  }
}
