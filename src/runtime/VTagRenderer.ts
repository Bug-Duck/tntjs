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
            try {
                return `${Globals.evaluate(s)}`
            } catch (e) {
                return `Error while rendering element: ${e}`
            }
        }
        render() {
            const vTags = document.querySelectorAll('v');
            for (const i of vTags) {
                // For each elements
                const rendered = i.getAttribute("data-rendered");
                if (rendered === null) {
                    // Not rendered
                    // In this case, the tag always should be rendered.
                    i.setAttribute("data-rendered", "YES");
                    i.setAttribute("data-original", i.innerHTML);
                    i.innerHTML = this.customRenderer?.(i.innerHTML) ?? this.defaultRenderer(i.innerHTML);
                } else {
                    // Already rendered
                    // In this case, we should check if the tag really should be rendered or not.
                    // This is called the DIFF CHECK
                    const content = i.getAttribute("data-original");
                    let newRenderedContent = this.customRenderer?.(content) ?? this.defaultRenderer(content);
                    // Compare if the element should be rerendered.
                    if (i.innerHTML !== newRenderedContent) {
                        // It's time to rerender it.
                        i.innerHTML = newRenderedContent;
                    } else {
                        // Else, just do nothing here.
                    }
                }
            }
        }
    }
}
