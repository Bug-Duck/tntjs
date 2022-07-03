/**
 * The main file of TNTJs renderer.
 */

import VTagRenderer from "./VTagRenderer";
import StaticVTagRenderer from "./StaticVTagRenderer";
import { Globals } from "./GlobalEnvironment";
import { Logger } from "src/utils/logger";

export default class TNT {
  #vTagRenderer: VTagRenderer;
  #svTagRenderer: StaticVTagRenderer;
  #refreshLock = true;
  #logger = new Logger("TNT Runtime");

  constructor() {
    // Entry point of a TNT page.
    // Register itself to the global object pool so that plugins can operate on it.
    Globals.instances.push(this);

    Globals.symbolTable.onSetValue(() => {
    // Render on update (Auto setState)
      if (!this.#refreshLock) {
        this.render();
      }
    });

    // Initialize renderers
    this.#vTagRenderer = new VTagRenderer();
    this.#svTagRenderer = new StaticVTagRenderer();

    // Check option tags
    const { isDebugModeOn, isFlipModeOn, isPureModeOn, isTNTScriptOn, pluginsToBeDisabled } = this.checkOptionTags();
  
    if (!isDebugModeOn) this.onDebugModeDisabled();
    if (isFlipModeOn) this.onFlipModeOn();
    if (isPureModeOn) this.onPureModeOn();
    if (!isTNTScriptOn) this.onTNTScriptDisabled();
    this.disablePlugins(pluginsToBeDisabled);

    // Initialize plugins
    const plugins = Globals.getAllPlugins();
    plugins.forEach((plugin) => {
      this.#logger.debug(`Loading plugin ${plugin.id}, version ${plugin.version}...`);
      try {
        // Check each dependency
        plugin.dependencies.forEach((dependency) => {
          const foundDependencies: string[] = [];
          // Iterating all plugins
          plugins.forEach((p) => {
            // Found the dependency, add to the record  
            if (p.id === dependency) {
              foundDependencies.push(p.id);
            }
          });
          // Compare the record length
          if (foundDependencies.length !== plugin.dependencies.length) {
            const err =
              `Missing dependencies of ${plugin.id}.\n` +
              `Required: ${plugin.dependencies.join(", ")}\n` +
              `But found: ${foundDependencies.join(", ")}\n` +
              "Plugin failed to load.";
            this.#logger.error(err, true);
            throw new Error("Plugin dependencies missing");
          }
        });
        plugin.onInit();
      } catch (e) {
        // If any error occurred, the plugin will NOT be loaded.
        this.#logger.error(`Error while loading plugin ${plugin.id}:\n${e}`, true);
        Globals.removePlugin(plugin.id);
        return;
      }
      this.#logger.debug(`Successfully loaded plugin ${plugin.id}`);
    });

    // Do the first rendering.
    this.render();
    this.onRender();

    // Unlock the refreshing
    this.#refreshLock = false;
  }

  // This function will check the option tags.
  checkOptionTags () {
    // Debug mode
    const isDebugModeOn = document.querySelectorAll("tnt-debug").length === 0;

    // TNT Script
    const isTNTScriptOn = document.querySelectorAll("tnt-no-script").length === 0;

    // Plugins to be disabled
    const pluginsToBeDisabled = [...document.querySelectorAll("tnt-disable-plugin")].map((tag) => (
      tag.getAttribute("plugin")
    ));

    // Pure mode.
    const pureModeTags = document.querySelectorAll("tnt-pure-mode");
    const noPluginModeTags = document.querySelectorAll("tnt-no-plugin");
    const isPureModeOn = pureModeTags.length !== 0 || noPluginModeTags.length !== 0;

    // Flip mode options
    // Easter egg!
    const isFlipModeOn = document.querySelectorAll("tnt-flip").length !== 0;

    return { isDebugModeOn, isTNTScriptOn, isPureModeOn, isFlipModeOn, pluginsToBeDisabled };
  }

  onDebugModeDisabled() {
    if (window.location.href.startsWith("file:")) {
      this.#logger.warn(
        "It seems that you are developing the webpage but you don't enable the debug mode.\n" +
        "It's better for you to enable the debug mode by the html tag <tnt-debug></tnt-debug> to enable more debugging features.\n" + 
        "If your application is designed to run on file:/// protocol, please ignore this warning.",
        true
      );
    }
    Globals.removePlugin("tntdebug");
  }

  onTNTScriptDisabled() {
    this.#logger.warn("Disabling TNT script may cause some unexpected results. If you're sure you want to disable the TNT Script feature, please ignore this warning.", true);
    Globals.removePlugin("tntscript");
  }

  disablePlugins(plugins) {
    plugins.forEach((pluginId) => {
      if (pluginId !== null) {
        Globals.removePlugin(pluginId);
      }
    });
  }

  onPureModeOn() {
    this.#logger.warn(
      "You disabled all the plugins, including the TNT Script plugin and TNT Debugger plugin! Are you sure that's what you want? If not, please turn off the Pure Mode option.\n\n" +
      "Hint:\n- Use <tnt-disable-plugin plugin=\"plugin_id_to_delete\"></tnt-disable-plugin> to disable a single plugin. \n" +
      "- Use <tnt-no-script></tnt-no-script> to disable the TNT Script integrated plugin (equal to <tnt-disable-plugin plugin=\"tntscript\"></tnt-disable-plugin>).\n" +
      "- Remove the <tnt-debug></tnt-debug> tag to disable the debugger plugin.\n",
      true
    );
    // disable all plugins
    Globals.getAllPlugins().forEach((plugin) => {
      Globals.removePlugin(plugin.id);
    });
  }

  onFlipModeOn() {
    window.addEventListener("load", () => {
      document.querySelector("html").style.setProperty("transform", "scaleX(-1)");
    });
  }

  render() {
    const plugins = Globals.getAllPlugins();
    // lock the refreshing function to avoid infinity recursion
    this.#refreshLock = true;

    // render the content (calls on updating and initializing)
    this.#vTagRenderer.render();

    // protect tags
    plugins.forEach((plugin) => {
      plugin.tags.forEach((tag) =>  {
        const tagDOM = document.querySelectorAll(tag);
        tagDOM.forEach((el) => {
          // each element
          try {
            el.setAttribute("data-tnt-plugin-value-backup", el.innerHTML);
            el.innerHTML = "";
          } catch (e) {
            // continue regardless of error
          }
        });
      });
      // render plugins
      plugin.rendererList.forEach((renderer) => { 
        renderer.render();
      });
      // take off the protection
      plugin.tags.forEach((tag) => {
        const tagDOM = document.querySelectorAll(tag);
        tagDOM.forEach((el) => {
          el.innerHTML = el.getAttribute("data-tnt-plugin-value-backup");
          el.removeAttribute("data-tnt-plugin-value-backup");
        });
      });
    });

    // unlock the refresh function
    this.#refreshLock = false;
  }

  onRender () {
    this.#svTagRenderer.render();
  }

  get vTagRenderer() {
    return this.#vTagRenderer;
  }
}
