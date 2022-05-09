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

            // Initialize plugins
            let pluginsShouldMove: string[] = [];

            for (const plugin of Globals.getAllPlugins()) {

                console.log(`Loading plugin ${plugin.id}, version ${plugin.version}...`)

                try {
                    // Check dependencies
                    if (plugin.dependencies !== undefined) {
                        // Check each dependency
                        for (const dependency of plugin.dependencies) {
                            const have: string[] = [];
                            // Iterating all plugins
                            for (const p of Globals.getAllPlugins()) {
                                // Found the dependency, add to the record  
                                if (p.id === dependency) {
                                    have.push(p.id);
                                }
                            }
                            // Compare the record length
                            if (have.length !== plugin.dependencies.length) {
                                console.log(`Missing dependencies of ${plugin.id}. Required: `);
                                for (const dependency of plugin.dependencies) {
                                    console.log(`${dependency}`);
                                }
                                console.log(`While found: `);
                                for (const h of have) {
                                    console.log(h);
                                }
                                console.log("Plugin loading failed.");
                                throw new Error("dependencies missing");
                            }
                        }
                    }
                    plugin.onInit();
                } catch (e) {
                    console.log(`Error whil loading plugin ${plugin.id}: ${e}`);
                    // Globals.removePlugin(plugin.id);
                    pluginsShouldMove.push(plugin.id);
                    continue;
                }
                console.log(`Successfully loaded plugin ${plugin.id}`);
            }

            // Remove the invalid plugins
            for (const pluginId of pluginsShouldMove) {
                Globals.removePlugin(pluginId);
            }

            // Do the first rendering.
            this.render();
        }
        render() {
            // Protect the tags
            for (const plugin of Globals.getAllPlugins()) {
                for (const tag of plugin.tags) {
                    let tagDOM = document.querySelectorAll(tag);
                    for (const el of tagDOM) {
                        // each element
                        try {
                            el.setAttribute("data-tnt-plugin-value-backup", el.innerHTML);
                            el.innerHTML = "";
                        } catch (e) {
                            // Do nothing here.
                        }
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
