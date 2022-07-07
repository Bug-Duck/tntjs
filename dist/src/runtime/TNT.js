import { __classPrivateFieldGet, __classPrivateFieldSet } from '../../node_modules/tslib/tslib.es6.js';
import VTagRenderer from './VTagRenderer.js';
import StaticVTagRenderer from './StaticVTagRenderer.js';
import { Globals } from './GlobalEnvironment.js';
import { Logger } from '../utils/logger.js';

var _TNT_vTagRenderer, _TNT_svTagRenderer, _TNT_refreshLock, _TNT_logger;
class TNT {
    constructor() {
        _TNT_vTagRenderer.set(this, void 0);
        _TNT_svTagRenderer.set(this, void 0);
        _TNT_refreshLock.set(this, true);
        _TNT_logger.set(this, new Logger("TNT Runtime"));
        Globals.instances.push(this);
        Globals.symbolTable.onSetValue(() => {
            if (!__classPrivateFieldGet(this, _TNT_refreshLock, "f")) {
                this.render();
            }
        });
        __classPrivateFieldSet(this, _TNT_vTagRenderer, new VTagRenderer(), "f");
        __classPrivateFieldSet(this, _TNT_svTagRenderer, new StaticVTagRenderer(), "f");
        const { isDebugModeOn, isFlipModeOn, isPureModeOn, isTNTScriptOn, pluginsToBeDisabled } = this.checkOptionTags();
        if (!isDebugModeOn)
            this.onDebugModeDisabled();
        if (isFlipModeOn)
            this.onFlipModeOn();
        if (isPureModeOn)
            this.onPureModeOn();
        if (!isTNTScriptOn)
            this.onTNTScriptDisabled();
        this.disablePlugins(pluginsToBeDisabled);
        const plugins = Globals.getAllPlugins();
        plugins.forEach((plugin) => {
            __classPrivateFieldGet(this, _TNT_logger, "f").debug(`Loading plugin ${plugin.id}, version ${plugin.version}...`);
            try {
                plugin.dependencies.forEach((dependency) => {
                    const foundDependencies = [];
                    plugins.forEach((p) => {
                        if (p.id === dependency) {
                            foundDependencies.push(p.id);
                        }
                    });
                    if (foundDependencies.length !== plugin.dependencies.length) {
                        const err = `Missing dependencies of ${plugin.id}.\n` +
                            `Required: ${plugin.dependencies.join(", ")}\n` +
                            `But found: ${foundDependencies.join(", ")}\n` +
                            "Plugin failed to load.";
                        __classPrivateFieldGet(this, _TNT_logger, "f").error(err, true);
                        throw new Error("Plugin dependencies missing");
                    }
                });
                plugin.onInit();
            }
            catch (e) {
                __classPrivateFieldGet(this, _TNT_logger, "f").error(`Error while loading plugin ${plugin.id}:\n${e}`, true);
                Globals.removePlugin(plugin.id);
                return;
            }
            __classPrivateFieldGet(this, _TNT_logger, "f").debug(`Successfully loaded plugin ${plugin.id}`);
        });
        this.render();
        this.onRender();
        __classPrivateFieldSet(this, _TNT_refreshLock, false, "f");
    }
    checkOptionTags() {
        const isDebugModeOn = document.querySelectorAll("tnt-debug").length === 0;
        const isTNTScriptOn = document.querySelectorAll("tnt-no-script").length === 0;
        const pluginsToBeDisabled = [...document.querySelectorAll("tnt-disable-plugin")].map((tag) => (tag.getAttribute("plugin")));
        const pureModeTags = document.querySelectorAll("tnt-pure-mode");
        const noPluginModeTags = document.querySelectorAll("tnt-no-plugin");
        const isPureModeOn = pureModeTags.length !== 0 || noPluginModeTags.length !== 0;
        const isFlipModeOn = document.querySelectorAll("tnt-flip").length !== 0;
        return { isDebugModeOn, isTNTScriptOn, isPureModeOn, isFlipModeOn, pluginsToBeDisabled };
    }
    onDebugModeDisabled() {
        if (window.location.href.startsWith("file:")) {
            __classPrivateFieldGet(this, _TNT_logger, "f").warn("It seems that you are developing the webpage but you don't enable the debug mode.\n" +
                "It's better for you to enable the debug mode by the html tag <tnt-debug></tnt-debug> to enable more debugging features.\n" +
                "If your application is designed to run on file:/// protocol, please ignore this warning.", true);
        }
        Globals.removePlugin("tntdebug");
    }
    onTNTScriptDisabled() {
        __classPrivateFieldGet(this, _TNT_logger, "f").warn("Disabling TNT script may cause some unexpected results. If you're sure you want to disable the TNT Script feature, please ignore this warning.", true);
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
        __classPrivateFieldGet(this, _TNT_logger, "f").warn("You disabled all the plugins, including the TNT Script plugin and TNT Debugger plugin! Are you sure that's what you want? If not, please turn off the Pure Mode option.\n\n" +
            "Hint:\n- Use <tnt-disable-plugin plugin=\"plugin_id_to_delete\"></tnt-disable-plugin> to disable a single plugin. \n" +
            "- Use <tnt-no-script></tnt-no-script> to disable the TNT Script integrated plugin (equal to <tnt-disable-plugin plugin=\"tntscript\"></tnt-disable-plugin>).\n" +
            "- Remove the <tnt-debug></tnt-debug> tag to disable the debugger plugin.\n", true);
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
        __classPrivateFieldSet(this, _TNT_refreshLock, true, "f");
        __classPrivateFieldGet(this, _TNT_vTagRenderer, "f").render();
        plugins.forEach((plugin) => {
            plugin.tags.forEach((tag) => {
                const tagDOM = document.querySelectorAll(tag);
                tagDOM.forEach((el) => {
                    try {
                        el.setAttribute("data-tnt-plugin-value-backup", el.innerHTML);
                        el.innerHTML = "";
                    }
                    catch (e) {
                    }
                });
            });
            plugin.rendererList.forEach((renderer) => {
                renderer.render();
            });
            plugin.tags.forEach((tag) => {
                const tagDOM = document.querySelectorAll(tag);
                tagDOM.forEach((el) => {
                    el.innerHTML = el.getAttribute("data-tnt-plugin-value-backup");
                    el.removeAttribute("data-tnt-plugin-value-backup");
                });
            });
        });
        __classPrivateFieldSet(this, _TNT_refreshLock, false, "f");
    }
    onRender() {
        __classPrivateFieldGet(this, _TNT_svTagRenderer, "f").render();
    }
    get vTagRenderer() {
        return __classPrivateFieldGet(this, _TNT_vTagRenderer, "f");
    }
}
_TNT_vTagRenderer = new WeakMap(), _TNT_svTagRenderer = new WeakMap(), _TNT_refreshLock = new WeakMap(), _TNT_logger = new WeakMap();

export { TNT as default };
//# sourceMappingURL=TNT.js.map
