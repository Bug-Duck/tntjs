import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { TNTInstances, removePlugin, addPlugin, getAllPlugins } from './GlobalEnvironment.js';
import { Logger } from '../lib/logger.js';
import renderers from '../renderers/index.js';

var _TNT_instances, _TNT_renderers, _TNT_refreshLock, _TNT_logger, _TNT_root, _TNT_symbolTable, _TNT_checkOptionTags, _TNT_onDebugModeDisabled, _TNT_onTNTScriptDisabled, _TNT_onPureModeOn, _TNT_onFlipModeOn;
class TNT {
    constructor(root, symbolTable) {
        _TNT_instances.add(this);
        _TNT_renderers.set(this, void 0);
        _TNT_refreshLock.set(this, true);
        _TNT_logger.set(this, new Logger("TNT Runtime"));
        _TNT_root.set(this, void 0);
        _TNT_symbolTable.set(this, void 0);
        if (!root) {
            throw TypeError("TNT root element cannot be undefined.");
        }
        if (!symbolTable) {
            throw TypeError("SymbolTable object cannot be undefined.");
        }
        __classPrivateFieldSet(this, _TNT_root, root, "f");
        __classPrivateFieldSet(this, _TNT_symbolTable, symbolTable, "f");
        TNTInstances.push(this);
        symbolTable.onSetValue(() => {
            if (!__classPrivateFieldGet(this, _TNT_refreshLock, "f")) {
                this.render();
            }
        });
        const { isDebugModeOn, isFlipModeOn, isPureModeOn, isTNTScriptOn, pluginsToBeDisabled } = __classPrivateFieldGet(this, _TNT_instances, "m", _TNT_checkOptionTags).call(this);
        if (!isDebugModeOn)
            __classPrivateFieldGet(this, _TNT_instances, "m", _TNT_onDebugModeDisabled).call(this);
        if (isFlipModeOn)
            __classPrivateFieldGet(this, _TNT_instances, "m", _TNT_onFlipModeOn).call(this);
        if (isPureModeOn)
            __classPrivateFieldGet(this, _TNT_instances, "m", _TNT_onPureModeOn).call(this);
        if (!isTNTScriptOn)
            __classPrivateFieldGet(this, _TNT_instances, "m", _TNT_onTNTScriptDisabled).call(this);
        this.disablePlugins(pluginsToBeDisabled);
        const plugins = getAllPlugins();
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
                removePlugin(plugin.id);
                return;
            }
            __classPrivateFieldGet(this, _TNT_logger, "f").debug(`Successfully loaded plugin ${plugin.id}`);
        });
        __classPrivateFieldSet(this, _TNT_renderers, renderers.map((renderer) => new renderer(__classPrivateFieldGet(this, _TNT_root, "f"), __classPrivateFieldGet(this, _TNT_symbolTable, "f"))), "f");
        this.render();
        __classPrivateFieldSet(this, _TNT_refreshLock, false, "f");
    }
    disablePlugins(pluginIds) {
        pluginIds.forEach((pluginId) => {
            if (pluginId !== null) {
                removePlugin(pluginId);
            }
        });
    }
    addPlugins(plugins) {
        plugins.forEach((plugin) => {
            addPlugin(__classPrivateFieldGet(this, _TNT_root, "f"), plugin);
        });
    }
    render() {
        const plugins = getAllPlugins();
        __classPrivateFieldSet(this, _TNT_refreshLock, true, "f");
        __classPrivateFieldGet(this, _TNT_renderers, "f").forEach((renderer) => renderer.render());
        plugins.forEach((plugin) => {
            plugin.tags.forEach((tag) => {
                const tagDOM = __classPrivateFieldGet(this, _TNT_root, "f").querySelectorAll(tag);
                tagDOM.forEach((el) => {
                    try {
                        el.setAttribute("data-tnt-plugin-value-backup", el.innerHTML);
                        el.innerHTML = "";
                    }
                    catch (_a) {
                    }
                });
            });
            plugin.rendererList.forEach((renderer) => {
                renderer.render();
            });
            plugin.tags.forEach((tag) => {
                const tagDOM = __classPrivateFieldGet(this, _TNT_root, "f").querySelectorAll(tag);
                tagDOM.forEach((el) => {
                    el.innerHTML = el.getAttribute("data-tnt-plugin-value-backup");
                    el.removeAttribute("data-tnt-plugin-value-backup");
                });
            });
        });
        __classPrivateFieldSet(this, _TNT_refreshLock, false, "f");
    }
}
_TNT_renderers = new WeakMap(), _TNT_refreshLock = new WeakMap(), _TNT_logger = new WeakMap(), _TNT_root = new WeakMap(), _TNT_symbolTable = new WeakMap(), _TNT_instances = new WeakSet(), _TNT_checkOptionTags = function _TNT_checkOptionTags() {
    const isDebugModeOn = __classPrivateFieldGet(this, _TNT_root, "f").querySelectorAll("tnt-debug").length === 0;
    const isTNTScriptOn = __classPrivateFieldGet(this, _TNT_root, "f").querySelectorAll("tnt-no-script").length === 0;
    const pluginsToBeDisabled = [...__classPrivateFieldGet(this, _TNT_root, "f").querySelectorAll("tnt-disable-plugin")].map((tag) => (tag.getAttribute("plugin")));
    const pureModeTags = __classPrivateFieldGet(this, _TNT_root, "f").querySelectorAll("tnt-pure-mode");
    const noPluginModeTags = __classPrivateFieldGet(this, _TNT_root, "f").querySelectorAll("tnt-no-plugin");
    const isPureModeOn = pureModeTags.length !== 0 || noPluginModeTags.length !== 0;
    const isFlipModeOn = __classPrivateFieldGet(this, _TNT_root, "f").querySelectorAll("tnt-flip").length !== 0;
    return { isDebugModeOn, isTNTScriptOn, isPureModeOn, isFlipModeOn, pluginsToBeDisabled };
}, _TNT_onDebugModeDisabled = function _TNT_onDebugModeDisabled() {
    if (window.location.href.startsWith("file:")) {
        __classPrivateFieldGet(this, _TNT_logger, "f").warn("It seems that you are developing the webpage but you don't enable the debug mode.\n" +
            "It's better for you to enable the debug mode by the html tag <tnt-debug></tnt-debug> to enable more debugging features.\n" +
            "If your application is designed to run on file:/// protocol, please ignore this warning.", true);
    }
    removePlugin("tntdebug");
}, _TNT_onTNTScriptDisabled = function _TNT_onTNTScriptDisabled() {
    __classPrivateFieldGet(this, _TNT_logger, "f").warn("Disabling TNT script may cause some unexpected results. If you're sure you want to disable the TNT Script feature, please ignore this warning.", true);
    removePlugin("tntscript");
}, _TNT_onPureModeOn = function _TNT_onPureModeOn() {
    __classPrivateFieldGet(this, _TNT_logger, "f").warn("You disabled all the plugins, including the TNT Script plugin and TNT Debugger plugin! Are you sure that's what you want? If not, please turn off the Pure Mode option.\n\n" +
        "Hint:\n- Use <tnt-disable-plugin plugin=\"plugin_id_to_delete\"></tnt-disable-plugin> to disable a single plugin. \n" +
        "- Use <tnt-no-script></tnt-no-script> to disable the TNT Script integrated plugin (equal to <tnt-disable-plugin plugin=\"tntscript\"></tnt-disable-plugin>).\n" +
        "- Remove the <tnt-debug></tnt-debug> tag to disable the debugger plugin.\n", true);
    getAllPlugins().forEach((plugin) => {
        removePlugin(plugin.id);
    });
}, _TNT_onFlipModeOn = function _TNT_onFlipModeOn() {
    window.addEventListener("load", () => {
        __classPrivateFieldGet(this, _TNT_root, "f").style.setProperty("transform", "scaleX(-1)");
    });
};

export { TNT as default };
//# sourceMappingURL=TNT.js.map
