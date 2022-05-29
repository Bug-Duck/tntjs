/**
 * file: VTagRenderer.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 8:15
 * description: Renderer for the V tag.
 */

namespace TNT {
    export class StaticVTagRenderer {
        private prv_firstRendering = true;
        private customRenderer?: (vTagContent: string) => string;
        constructor(customRenderer: (vTagContent: string) => string = undefined) {
            this.customRenderer = customRenderer;
        }
        private defaultRenderer(s: string): string {
            try {
                return `${Globals.evaluate(s)}`
            } catch (e) {
                return `Error while rendering element: ${e}`;
            }
        }
        render() {
            if (this.prv_firstRendering) {
                const svTags = document.querySelectorAll('sv');
                for (const i of svTags) {
                    i.innerHTML = this.customRenderer?.(i.innerHTML) ?? this.defaultRenderer(i.innerHTML);
                }
            }
            this.prv_firstRendering = true;
        }
    }
}
