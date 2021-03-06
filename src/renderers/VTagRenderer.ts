/**
 * Renderer for the V tag.
 */

import { removeNodesWithParents } from "lib/common";
import { evaluate } from "runtime/GlobalEnvironment";
import { SymbolTable } from "runtime/SymbolTable";
import { ignoreRender, Renderer } from "./index";

export default class VTagRenderer implements Renderer {
  #customRenderer: (vTagContent: string) => string;
  #root: HTMLElement;
  #symbolTable: SymbolTable;

  constructor (root: HTMLElement, symbolTable: SymbolTable, customRenderer?: (vTagContent: string) => string) {
    this.#customRenderer = customRenderer;
    this.#root = root;
    this.#symbolTable = symbolTable;
    this.defaultRenderer = this.defaultRenderer.bind(this);
  }

  defaultRenderer (s: string): string {
    try {
      return `${evaluate(this.#symbolTable, s).value}`;
    } catch (e) {
      return `Error while rendering element: ${e}`;
    }
  }

  render () {
    const vTags = [...this.#root.getElementsByTagName("v")];
    const renderer = this.#customRenderer ?? this.defaultRenderer;
    removeNodesWithParents(vTags, ignoreRender).forEach((tag) => {
      const rendered = tag.getAttribute("data-rendered");
      if (rendered === null) {
        // tags should always be rendered
        tag.setAttribute("data-rendered", "YES");
        tag.setAttribute("data-original", tag.getAttribute("data"));
        tag.removeAttribute("data");
        tag.innerHTML = renderer(tag.getAttribute("data-original"));
        return;
      }
      // if rendered, we should check if the tag really should be rendered or not
      // this process is called the DIFF CHECK
      const content = tag.getAttribute("data-original");
      const newlyRenderedContent = renderer(content);
      // compare if the element should be rerendered
      tag.innerHTML = newlyRenderedContent;
    });
  }
}
