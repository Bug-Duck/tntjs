/**
 * file: TNT.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 8:14
 * description: The main file of TNTJs renderer.
 */

namespace TNT {
    export class TNT {
        private vTagRenderer: VTagRenderer
        constructor() {
            Globals.symbolTable.onSetValue(() => {
                // Render on update (Auto setState)
                this.render();
            })

            this.vTagRenderer = new VTagRenderer();
            this.render();
        }
        render() {
            this.vTagRenderer.render();
        }
    }
}
