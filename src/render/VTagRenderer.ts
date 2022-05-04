/**
 * file: VTagRenderer.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 8:15
 * description: Renderer for the V tag.
 */

namespace TNT {
    export class VTagRenderer {
        private customRenderer?: (vTagContent: string) => string;
        constructor(customRenderer: (vTagContent: string) => string = undefined) {
            this.customRenderer = customRenderer;
        }
        private defaultRenderer(s: string): string {
            return "aababab"
        }
        render() {
            const vTags = document.querySelectorAll('v');
            for (const i of vTags) {
                // For each elements
                const rendered = i.getAttribute("data-rendered");
                if (rendered === null) {
                    // not rendered
                    i.setAttribute("data-rendered", "YES");
                    i.setAttribute("data-original", i.innerHTML);
                    if (this.customRenderer) {
                        i.innerHTML = this.customRenderer(i.innerHTML);
                    } else {
                        i.innerHTML = this.defaultRenderer(i.innerHTML);
                    }
                } else {
                    // already rendered
                    const content = i.getAttribute("data-original");
                    if (this.customRenderer) {
                        i.innerHTML = this.customRenderer(content);
                    } else {
                        i.innerHTML = this.defaultRenderer(content);
                    }
                }
            }
        }
    }
}
