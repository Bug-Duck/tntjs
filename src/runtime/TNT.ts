/**
 * The main file of TNTJs renderer.
 */


import { TNTInstances } from "./GlobalEnvironment";
import { Logger } from "src/lib/logger";
import { Plugin } from "./Pluggable";
import { SymbolTable } from "./SymbolTable";
import renderers, { RendererType } from "src/renderers/index";

/**
 * The runtime object.
 */
export default class TNT {
  #renderers: RendererType[];
  #refreshLock = true;
  #logger = new Logger("TNT Runtime");
  #root: HTMLElement;
  #symbolTable: SymbolTable;

  /**
   * All the plugins.
   */
  plugins: Plugin[];

  /**
   * Construct a runtime instance.
   * @param {HTMLElement} root The root element of the current runtime context.
   * @param {SymbolTable} symbolTable The symbol table of the current runtime context.
   * @param {Plugin[]} plugins Preloaded plugins.
   */
  constructor(root: HTMLElement, symbolTable: SymbolTable, plugins: Plugin[] = []) {
    if (!root) {
      throw TypeError("TNT root element cannot be undefined.");
    }
    if (!symbolTable) {
      throw TypeError("SymbolTable object cannot be undefined.");
    }

    this.#root = root;
    this.#symbolTable = symbolTable;
    this.plugins = plugins;
    // Entry point of a TNT page.
    // Register itself to the global object pool so that plugins can operate on it.
    TNTInstances.push(this);

    symbolTable.onSetValue(() => {
      // Render on update (Auto setState)
      if (!this.#refreshLock) {
        this.render();
      }
    });

    // Check option tags
    const { isDebugModeOn, isFlipModeOn, isPureModeOn, isTNTScriptOn, pluginsToBeDisabled } = this.#checkOptionTags();
  
    if (!isDebugModeOn) this.#onDebugModeDisabled();
    if (isFlipModeOn) this.#onFlipModeOn();
    if (isPureModeOn) this.#onPureModeOn();
    if (!isTNTScriptOn) this.#onTNTScriptDisabled();
    this.disablePlugins(pluginsToBeDisabled);

    // Initialize plugins
    this.plugins.forEach((plugin) => {
      this.#isPluginInstantiated(plugin);
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
        this.removePlugin(plugin.id);
        return;
      }
      this.#logger.debug(`Successfully loaded plugin ${plugin.id}`);
    });

    // Initialize renderers
    this.#renderers = renderers.map((renderer) => new renderer(this.#root, this.#symbolTable));

    // Do the first rendering.
    this.render();

    // Unlock the refreshing
    this.#refreshLock = false;
  }

  // This function will check the option tags.
  #checkOptionTags () {
    // Debug mode
    const isDebugModeOn = this.#root.querySelectorAll("tnt-debug").length === 0;

    // TNT Script
    const isTNTScriptOn = this.#root.querySelectorAll("tnt-no-script").length === 0;

    // Plugins to be disabled
    const pluginsToBeDisabled = [...this.#root.querySelectorAll("tnt-disable-plugin")].map((tag) => (
      tag.getAttribute("plugin")
    ));

    // Pure mode.
    const pureModeTags = this.#root.querySelectorAll("tnt-pure-mode");
    const noPluginModeTags = this.#root.querySelectorAll("tnt-no-plugin");
    const isPureModeOn = pureModeTags.length !== 0 || noPluginModeTags.length !== 0;

    // Flip mode options
    // Easter egg!
    const isFlipModeOn = this.#root.querySelectorAll("tnt-flip").length !== 0;

    return { isDebugModeOn, isTNTScriptOn, isPureModeOn, isFlipModeOn, pluginsToBeDisabled };
  }

  #isPluginInstantiated(plugin) {
    // plugin type check
    if (typeof plugin.prototype !== "undefined") {
      throw new TypeError("Plugins need to be instantiated.");
    }
  }

  #onDebugModeDisabled() {
    if (window.location.href.startsWith("file:")) {
      this.#logger.warn(
        "It seems that you are developing the webpage but you don't enable the debug mode.\n" +
        "It's better for you to enable the debug mode by the html tag <tnt-debug></tnt-debug> to enable more debugging features.\n" + 
        "If your application is designed to run on file:/// protocol, please ignore this warning.",
        true
      );
    }
    this.removePlugin("tntdebug");
  }

  #onTNTScriptDisabled() {
    this.#logger.warn("Disabling TNT script may cause some unexpected results. If you're sure you want to disable the TNT Script feature, please ignore this warning.", true);
    this.removePlugin("tntscript");
  }

  #onPureModeOn() {
    this.#logger.warn(
      "You disabled all the plugins, including the TNT Script plugin and TNT Debugger plugin! Are you sure that's what you want? If not, please turn off the Pure Mode option.\n\n" +
      "Hint:\n- Use <tnt-disable-plugin plugin=\"plugin_id_to_delete\"></tnt-disable-plugin> to disable a single plugin. \n" +
      "- Use <tnt-no-script></tnt-no-script> to disable the TNT Script integrated plugin (equal to <tnt-disable-plugin plugin=\"tntscript\"></tnt-disable-plugin>).\n" +
      "- Remove the <tnt-debug></tnt-debug> tag to disable the debugger plugin.\n",
      true
    );
    // disable all plugins
    this.plugins.forEach((plugin) => {
      this.removePlugin(plugin.id);
    });
  }

  #onFlipModeOn() {
    window.addEventListener("load", () => {
      this.#root.style.setProperty("transform", "scaleX(-1)");
    });
  }

  /**
   * Disable the given plugins.
   * @param {string[]} pluginIds The ids of the plugins.
   */
  disablePlugins(pluginIds: string[]) {
    pluginIds.forEach((pluginId) => {
      if (pluginId !== null) {
        this.removePlugin(pluginId);
      }
    });
  }

  /**
   * Add a plugin to the runtime.
   * @param {HTMLElement} root The root element that will be used in the plugin.
   * @param {Plugin} plugin The plugin instance that will be added.
   */
  addPlugin(root: HTMLElement, plugin: Plugin) {
    this.#isPluginInstantiated(plugin);
    plugin.root = root;
    this.plugins.push(plugin);
  }

  /**
   * Add plugins.
   * @param {Plugin[]} plugins The instances of plugins that will be added.
   */
  addPlugins(plugins: Plugin[]) {
    plugins.forEach((plugin) => {
      this.addPlugin(this.#root, plugin);
    });
  }

  /**
   * Remove a plugin by the id of the plugin.
   * @param pluginId The id of the plugin that will be removed.
   */
  removePlugin(pluginId: string) {
    let pluginPosition;
    this.plugins.forEach((plugin, index) => {
      if (plugin.id === pluginId) {
        pluginPosition = index;
      }
    });
    this.plugins.splice(pluginPosition, pluginPosition);
  }

  /**
   * Render everything.
   */
  render() {
    // lock the refreshing function to avoid infinity recursion
    this.#refreshLock = true;

    // render the content (calls on updating and initializing)
    this.#renderers.forEach((renderer) => renderer.render());

    // protect tags
    this.plugins.forEach((plugin) => {
      plugin.tags.forEach((tag) =>  {
        const tagDOM = this.#root.querySelectorAll(tag);
        tagDOM.forEach((el) => {
          // each element
          try {
            el.setAttribute("data-tnt-plugin-value-backup", el.innerHTML);
            el.innerHTML = "";
          } catch {
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
        const tagDOM = this.#root.querySelectorAll(tag);
        tagDOM.forEach((el) => {
          el.innerHTML = el.getAttribute("data-tnt-plugin-value-backup");
          el.removeAttribute("data-tnt-plugin-value-backup");
        });
      });
    });

    // unlock the refresh function
    this.#refreshLock = false;
  }
}
