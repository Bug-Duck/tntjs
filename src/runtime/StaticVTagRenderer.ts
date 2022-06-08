/**
 * file: VTagRenderer.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 8:15
 * description: Renderer for the V tag.
 */
import { Globals } from "./GlobalEnvironment";

export default class StaticVTagRenderer {
  private customRenderer?: (vTagContent: string) => string;
  private renderer: (vTagContent: string) => string;

  constructor(customRenderer: (vTagContent: string) => string = undefined) {
    this.customRenderer = customRenderer;
    this.renderer = this.customRenderer ?? this.defaultRenderer;
  }

  private defaultRenderer(s: string): string {
    try {
      return `${Globals.evaluate(s)}`;
    } catch (e) {
      return `Error while rendering element: ${e}`;
    }
  }
  render() {
    const svTags = document.querySelectorAll("sv");
    svTags.forEach((tag) => {
      tag.innerHTML = this.renderer(tag.innerHTML);
    });
  }
}

