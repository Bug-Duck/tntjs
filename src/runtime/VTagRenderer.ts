/**
 * Renderer for the V tag.
 */

import { Globals } from "./GlobalEnvironment";

export default class VTagRenderer {
  private customRenderer;

  constructor (customRenderer: (vTagContent: string) => string = undefined) {
    this.customRenderer = customRenderer;
  }

  defaultRenderer (s: string): string {
    try {
      return `${Globals.evaluate(s)}`;
    } catch (e) {
      return `Error while rendering element: ${e}`;
    }
  }

  render () {
    const vTags = document.querySelectorAll("v");
    const renderer = this.customRenderer ?? this.defaultRenderer;
    for (const tag of vTags) {
      const rendered = tag.getAttribute("data-rendered");
      if (rendered === null) {
      // tag always should be rendered
        tag.setAttribute("data-rendered", "YES");
        tag.setAttribute("data-original", tag.innerHTML);
        tag.innerHTML = this.customRenderer?.(tag.innerHTML) ?? this.defaultRenderer(tag.innerHTML);
        return;
      }
      // if rendered, we should check if the tag really should be rendered or not
      // This is called the DIFF CHECK
      const content = tag.getAttribute("data-original");
      const newRenderedContent = renderer(content);
      // Compare if the element should be rerendered.
      if (tag.innerHTML !== newRenderedContent) {
        tag.innerHTML = newRenderedContent;
      }
    }
  }
}
