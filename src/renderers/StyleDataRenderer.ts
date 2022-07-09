import { evaluate } from "runtime/GlobalEnvironment";
import { SymbolTable } from "runtime/SymbolTable";
import { Renderer } from "./index";

// to separate tags
export const SEPARATOR = ";";
// to connect tag name and tag content
export const CONNECTOR = "->";

export type StyleDataCustomRendererType = (
  style: string
) => Record<string, string>;

export default class StyleDataRenderer implements Renderer {
  #customRenderer: StyleDataCustomRendererType;
  #root: HTMLElement;
  #symbolTable: SymbolTable;

  constructor(
    root: HTMLElement,
    symbolTable: SymbolTable,
    customRenderer?: StyleDataCustomRendererType
  ) {
    this.#root = root;
    this.#symbolTable = symbolTable;
    this.#customRenderer = customRenderer;
    this.defaultRenderer = this.defaultRenderer.bind(this);
  }

  defaultRenderer(style: string): Record<string, string> {
    const rendered: Record<string, string> = {};
    style.split(SEPARATOR).forEach((style) => {
      const stylePre = style.split(CONNECTOR);
      const [styleKey, styleValue] = [stylePre[0].trim(), stylePre[1].trim()];
      try {
        rendered[styleKey] = evaluate(this.#symbolTable, styleValue).toString();
      } catch (e) {
        rendered[styleKey] = `[ERROR] ${e}`;
      }
    });
    return rendered;
  }

  #setTagStyles(tag: Element, styles: Record<string, string>) {
    let finalStyle = "";
    for (const styleKey in styles) {
      finalStyle += `${styleKey}: ${styles[styleKey]}`;
    }
    tag.setAttribute("style", finalStyle);
  }

  render() {
    const tagsToRender = this.#root.querySelectorAll("[tnt-sd]");
    const render = this.#customRenderer ?? this.defaultRenderer;
    tagsToRender.forEach((tag) => {
      const isRendered = tag.getAttribute("data-sd-rendered");
      if (!isRendered) {
        tag.setAttribute("data-sd-rendered", "YES");
        tag.setAttribute("data-sd", tag.getAttribute("tnt-sd"));
        tag.removeAttribute("tnt-sd");
        this.#setTagStyles(tag, render(tag.getAttribute("data-sd")));
        return;
      }
      console.log(tag);
      // diff check is unnecessary here due to the time complexity of diff-checking
      // and directly reassigning is about the same
      const newlyRenderedContent = render(tag.getAttribute("data-sd"));
      this.#setTagStyles(tag, newlyRenderedContent);
    });
  }
}
