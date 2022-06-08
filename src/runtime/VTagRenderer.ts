/**
 * Renderer for the V tag.
 */

import { Globals } from "./GlobalEnvironment";

export default class VTagRenderer {
  #customRenderer;

  constructor (customRenderer: (vTagContent: string) => string = undefined) {
    this.#customRenderer = customRenderer;
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
    const renderer = this.#customRenderer ?? this.defaultRenderer;
    vTags.forEach((tag) => {
      const rendered = tag.getAttribute("data-rendered");
      if (rendered === null) {
        // tags should always be rendered
        tag.setAttribute("data-rendered", "YES");
        tag.setAttribute("data-original", tag.innerHTML);
        tag.innerHTML = renderer(tag.innerHTML);
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
