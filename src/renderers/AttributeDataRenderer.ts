/**
 * Renderer for TNT Tag Data.
 * For example, the below code:
 *
 * ```html
 * <!-- Assuming that in JavaScript it already defined a variable called `link` with value `https://example.com` -->
 * <v name="link">Link here</v>
 * <a tnt-td="href -> link">Click me</a>
 * ```
 *
 * Will be rendered into:
 *
 * ```html
 * <v>https://example.com</v>
 * <a href="https://example.com">Click me</a>
 */

import { evaluate } from "runtime/GlobalEnvironment";
import { SymbolTable } from "runtime/SymbolTable";
import { Renderer } from "./index";

// to separate tags
export const SEPARATOR = ";";
// to connect tag name and tag content
export const CONNECTOR = "->";

export type AttributeDataCustomRendererType = (
  tagContent: string
) => Record<string, string>;

export default class AttributeDataRenderer implements Renderer {
  #customRenderer: AttributeDataCustomRendererType;
  #root: HTMLElement;
  #symbolTable: SymbolTable;

  constructor(
    root: HTMLElement,
    symbolTable: SymbolTable,
    customRenderer?: AttributeDataCustomRendererType
  ) {
    this.#root = root;
    this.#symbolTable = symbolTable;
    this.#customRenderer = customRenderer;
    this.defaultRenderer = this.defaultRenderer.bind(this);
  }

  defaultRenderer(tagContent: string): Record<string, string> {
    const rendered: Record<string, string> = {};
    const attributesTrigger = ["onclick"];
    tagContent.split(SEPARATOR).forEach((tag) => {
      const tagPre = tag.split(CONNECTOR);
      const [tagName, tagContent] = [tagPre[0].trim(), tagPre[1].trim()];
      try {
        if (attributesTrigger.includes(tagName)) rendered[tagName] = evaluate(this.#symbolTable, tagContent, [], true).expr;
        else rendered[tagName] = evaluate(this.#symbolTable, tagContent).value?.toString();
      } catch (e) {
        rendered[tagName] = `[ERROR] ${e}`;
      }
    });
    return rendered;
  }

  #setTagAttributes(tag: Element, attributes: Record<string, string>) {
    for (const attributeName in attributes) {
      tag.setAttribute(attributeName, attributes[attributeName]);
    }
  }

  render() {
    const tagsToRender = this.#root.querySelectorAll("[tnt-td]");
    const render = this.#customRenderer ?? this.defaultRenderer;
    tagsToRender.forEach((tag) => {
      const isRendered = tag.getAttribute("data-td-rendered");
      if (!isRendered) {
        tag.setAttribute("data-td-rendered", "YES");
        tag.setAttribute("data-td", tag.getAttribute("tnt-td"));
        tag.removeAttribute("tnt-td");
        this.#setTagAttributes(tag, render(tag.getAttribute("data-td")));
        return;
      }
      // diff check is unnecessary here due to the time complexity of diff-checking
      // and directly reassigning is about the same
      const newlyRenderedContent = render(tag.getAttribute("data-td"));
      this.#setTagAttributes(tag, newlyRenderedContent);
    });
  }
}
