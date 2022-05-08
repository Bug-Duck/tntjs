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

            // Initialize plugins
            for (const plugin of Globals.getAllPlugins()) {
                console.log(`Loading plugin ${plugin.id}, version ${plugin.version}...`);
                try {
                    plugin.onInit();
                } catch (e) {
                    console.log(`Error whil loading plugin ${plugin.id}: ${e}`);
                    continue;
                }
                console.log(`Successfully loaded plugin ${plugin.id}`);
            }
        }
        render() {
            // Protect the tags
            for (const plugin of Globals.getAllPlugins()) {
                for (const tag of plugin.tags) {
                    let tagDOM = document.querySelectorAll(tag);
                    for (const el of tagDOM) {
                        // each element
                        el.setAttribute("data-tnt-plugin-value-backup", el.innerHTML);
                        el.innerHTML = "";
                    }
                }
            }

            // Render the content. Calls on updating and initializing
            this.prv_vTagRenderer.render();

            // Render for the plugin
            for (const plugin of Globals.getAllPlugins()) {
                for (const renderer of plugin.rendererList) {
                    renderer.render();
                }
            }

            // Take off the protection
            for (const plugin of Globals.getAllPlugins()) {
                for (const tag of plugin.tags) {
                    let tagDOM = document.querySelectorAll(tag);
                    for (const el of tagDOM) {
                        // each element
                        el.innerHTML = el.getAttribute("data-tnt-plugin-value-backup");
                        el.removeAttribute("data-tnt-plugin-value-backup")
                    }
                }
            }
        }
        get vTagRenderer(): VTagRenderer {
            return this.prv_vTagRenderer;
        }
    }
}
