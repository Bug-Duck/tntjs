/**
 * file: TNT.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 8:14
 * description: The main file of TNTJs renderer.
 */

namespace TNT {
    export class TNT {
        private prv_vTagRenderer: VTagRenderer;
        private prv_options: string[];
        private prv_isDebug: boolean = true;
        private prv_refreshLock: boolean = true;


        // This function will check the option tags.
        private prv_checkOptionTags() {

            // Debug mode.
            let debugModeOptionTags = document.querySelectorAll("tnt-debug");
            if (debugModeOptionTags.length === 0) {
                // Didn't enable the debug mode.
                if (window.location.href.startsWith("file:")) {
                    // Maybe in the developing environment.
                    console.warn("Warning: It seems that you are developing the webpage but you don't enable the debug mode.\nIt's better for you to enable the debug mode by the html tag <tnt-debug></tnt-debug> to enable more debugging features.");
                    console.warn("If your application is designed to run on file:/// protocal, please ignore this warning.");
                }
                Globals.removePlugin('tntdebug');
                this.prv_isDebug = false;
            }

            // Disable the tnt script feature.
            let noTNTScriptTags = document.querySelectorAll("tnt-no-script");
            if (noTNTScriptTags.length !== 0) {
                console.warn("Warning: Disabling TNT script may cause some unexpected results. If you're sure you want to disabl the TNT Script feature, please ignore this warning.");
                Globals.removePlugin('tntscript');
            }

            // Disable other plugins that required to be disabled.
            let disablePluginTags = document.querySelectorAll('tnt-disable-plugin');
            for (const tag of disablePluginTags) {
                const pluginId = tag.getAttribute('plugin');
                if (pluginId !== null) {
                    Globals.removePlugin(pluginId);
                }
            }

            // Pure mode.
            let pureModeTags = document.querySelectorAll('tnt-pure-mode');
            let noPluginModeTags = document.querySelectorAll('tnt-no-plugin');
            if (pureModeTags.length !== 0 || noPluginModeTags.length !== 0) {
                console.warn('Warning: You disabled all the plugins, including the TNT Script plugin and TNT Debugger plugin! Are you sure that\'s what you want? If not, please turn off the Pure Mode option. ');
                console.log('Hint: Use <tnt-disable-plugin plugin="plugin_id_to_delete"></tnt-disable-plugin> to disable a single plugin. \nUse <tnt-no-script></tnt-disable-plugin> to disable the TNT Script integrated plugin (equal to <tnt-disable-plugin plugin="tntscript"></tnt-disable-plugin>). Remove the <tnt-debug></tnt-debug> tag to disable the debugger plugin.');
                // Disable all the plugins.
                let pluginNames: string[] = [];
                for (const plugin of Globals.getAllPlugins()) {
                    pluginNames.push(plugin.id);
                }
                for (const pluginId of pluginNames) {
                    Globals.removePlugin(pluginId);
                }
            }

            // ----------------------------------------------------------------
            // EASTER EGGS OPTIONS
            let flipModeTags = document.querySelectorAll('tnt-flip');
            if (flipModeTags.length !== 0) {
                // Flip mode on
                window.addEventListener('load', () => {
                    document.querySelector('html').style.setProperty('transform', 'scaleX(-1)');
                });
            }
            // ----------------------------------------------------------------

        }

        constructor() {
            // Entry point of a TNT page.
            // Register itself to the global object pool so that plugins can operate on it.
            Globals.instances.push(this);

            Globals.symbolTable.onSetValue(() => {
                // Render on update (Auto setState)
                if (!this.prv_refreshLock) {
                    this.render();
                }
            })

            // Check option tags
            this.prv_checkOptionTags();

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

            // Unlock the refreshing
            this.prv_refreshLock = false;
        }
        render() {
            // Lock the refreshing functino to avoid infinity recursion.
            this.prv_refreshLock = true;

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

            // Unlock the refresh function
            this.prv_refreshLock = false;
        }
        get vTagRenderer(): VTagRenderer {
            return this.prv_vTagRenderer;
        }
    }
}
