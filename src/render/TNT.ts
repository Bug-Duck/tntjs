/**
 * file: TNT.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 8:14
 * description: The main file of TNTJs renderer.
 */

namespace TNT {
    export class TNT {
        private prv_vTagRenderer: VTagRenderer
        constructor() {
            // Entry point of a TNT page.
            // Register itself to the global object pool so that plugins can operate on it.
            Globals.instances.push(this);

            Globals.symbolTable.onSetValue(() => {
                // Render on update (Auto setState)
                this.render();
            })

            // Initialize renderer
            this.prv_vTagRenderer = new VTagRenderer();
            this.render();
        }
        render() {
            // Render the content. Calls on updating and initializing
            this.prv_vTagRenderer.render();
        }
        get vTagRenderer(): VTagRenderer {
            return this.prv_vTagRenderer;
        }
    }
}
