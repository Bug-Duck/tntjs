var TNTDebug;
(function (TNTDebug) {
    class DebugRenderTracer {
        render() {
            console.log("[Debugger] Renderer called to perform a render.");
        }
    }
    TNTDebug.DebugRenderTracer = DebugRenderTracer;
})(TNTDebug || (TNTDebug = {}));
var TNT;
(function (TNT) {
    class TypeInfo {
        constructor(namespaceName, typeName) {
            this.prv_namespaceName = namespaceName;
            this.prv_typeName = typeName;
        }
        toString() {
            return `${this.prv_namespaceName}:type.${this.prv_typeName}`;
        }
        get name() {
            return this.prv_typeName;
        }
        get owner() {
            return this.prv_typeName;
        }
    }
    TNT.TypeInfo = TypeInfo;
})(TNT || (TNT = {}));
var TNT;
(function (TNT) {
    TNT.StringType = new TNT.TypeInfo("tnt", "string");
    TNT.NumberType = new TNT.TypeInfo("tnt", "number");
    TNT.ObjectType = new TNT.TypeInfo("tnt", "object");
    TNT.TNTFunctionType = new TNT.TypeInfo("tnt", "function");
    TNT.JSFunctionType = new TNT.TypeInfo("js", "function");
    TNT.HTMLStringType = new TNT.TypeInfo("tnt", "html_string");
    class Variable {
        constructor(value, type) {
            this.prv_validate(value, type);
            this.prv_value = value;
            this.prv_type = type;
        }
        prv_validate(value, type) {
            if (type === TNT.StringType && typeof (value) !== "string") {
                throw new TypeError("value should ba a string.");
            }
            if (type === TNT.HTMLStringType && typeof (value) !== "string") {
                throw new TypeError("value should ba a string.");
            }
            if (type === TNT.NumberType && typeof (value) !== "number") {
                throw new TypeError("value should ba a number.");
            }
            if (type === TNT.JSFunctionType && typeof (value) !== "function") {
                throw new TypeError("value should ba a javascript function.");
            }
        }
        get value() {
            return this.prv_value;
        }
        set value(value) {
            this.prv_validate(value, this.prv_type);
            this.prv_value = value;
        }
        get type() {
            return this.prv_type;
        }
    }
    TNT.Variable = Variable;
    class SymbolTable {
        constructor() {
            this.prv_onsetvalue_event_handler = [];
            this.prv_content = {};
        }
        getValue(key) {
            return this.prv_content[key];
        }
        setValue(key, v) {
            this.prv_content[key] = v;
            for (const i of this.prv_onsetvalue_event_handler) {
                i();
            }
        }
        onSetValue(handler) {
            this.prv_onsetvalue_event_handler.push(handler);
        }
    }
    TNT.SymbolTable = SymbolTable;
})(TNT || (TNT = {}));
var TNT;
(function (TNT) {
    function prv_stringContains(char, s) {
        for (const i of s) {
            if (i === char) {
                return true;
            }
        }
        return false;
    }
    let Globals;
    (function (Globals) {
        Globals.symbolTable = new TNT.SymbolTable();
        Globals.instances = [];
        let valueEvaluator = (expr) => {
            const value = Globals.symbolTable.getValue(expr.trim());
            if (value.type === TNT.StringType) {
                let answer = value.value;
                while (prv_stringContains('&', answer)) {
                    answer = answer.replace('&', "&amp;");
                }
                while (prv_stringContains('<', answer)) {
                    answer = answer.replace('<', "&lt;");
                }
                while (prv_stringContains('>', answer)) {
                    answer = answer.replace('>', "&gt;");
                }
                return answer;
            }
            return value.value;
        };
        function setValueEvaluator(fn) {
            valueEvaluator = fn;
        }
        Globals.setValueEvaluator = setValueEvaluator;
        function evaluate(expr) {
            return valueEvaluator(expr);
        }
        Globals.evaluate = evaluate;
        let prv_pluginList = [];
        function addPlugin(plugin) {
            prv_pluginList.push(plugin);
        }
        Globals.addPlugin = addPlugin;
        function plug(plugin) {
            addPlugin(plugin);
        }
        Globals.plug = plug;
        function getAllPlugins() {
            return prv_pluginList;
        }
        Globals.getAllPlugins = getAllPlugins;
        function removePlugin(pluginId) {
            let counter = 0;
            let found = false;
            for (const plugin of prv_pluginList) {
                if (plugin.id === pluginId) {
                    found = true;
                    break;
                }
                counter++;
            }
            if (!found) {
                return;
            }
            prv_pluginList = prv_pluginList.slice(0, counter).concat(prv_pluginList.slice(counter + 1));
        }
        Globals.removePlugin = removePlugin;
    })(Globals = TNT.Globals || (TNT.Globals = {}));
})(TNT || (TNT = {}));
var TNTDebug;
(function (TNTDebug) {
    class PluginMain {
        get id() {
            return "tntdebug";
        }
        get rendererList() {
            return [new TNTDebug.DebugRenderTracer()];
        }
        get tags() {
            return [];
        }
        get version() {
            return "1.0.0-integrated";
        }
        onInit() {
            console.log("[Debugger] Debug mode enabled. ");
        }
    }
    TNTDebug.PluginMain = PluginMain;
})(TNTDebug || (TNTDebug = {}));
TNT.Globals.plug(new TNTDebug.PluginMain());
var TNT;
(function (TNT_1) {
    class TNT {
        constructor() {
            this.prv_isDebug = true;
            this.prv_refreshLock = true;
            TNT_1.Globals.instances.push(this);
            TNT_1.Globals.symbolTable.onSetValue(() => {
                if (!this.prv_refreshLock) {
                    this.render();
                }
            });
            this.prv_checkOptionTags();
            this.prv_vTagRenderer = new TNT_1.VTagRenderer();
            let pluginsShouldMove = [];
            for (const plugin of TNT_1.Globals.getAllPlugins()) {
                console.log(`Loading plugin ${plugin.id}, version ${plugin.version}...`);
                try {
                    if (plugin.dependencies !== undefined) {
                        for (const dependency of plugin.dependencies) {
                            const have = [];
                            for (const p of TNT_1.Globals.getAllPlugins()) {
                                if (p.id === dependency) {
                                    have.push(p.id);
                                }
                            }
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
                }
                catch (e) {
                    console.log(`Error whil loading plugin ${plugin.id}: ${e}`);
                    pluginsShouldMove.push(plugin.id);
                    continue;
                }
                console.log(`Successfully loaded plugin ${plugin.id}`);
            }
            for (const pluginId of pluginsShouldMove) {
                TNT_1.Globals.removePlugin(pluginId);
            }
            this.render();
            this.prv_refreshLock = false;
        }
        prv_checkOptionTags() {
            let debugModeOptionTags = document.querySelectorAll("tnt-debug");
            if (debugModeOptionTags.length === 0) {
                if (window.location.href.startsWith("file:")) {
                    console.warn("Warning: It seems that you are developing the webpage but you don't enable the debug mode.\nIt's better for you to enable the debug mode by the html tag <tnt-debug></tnt-debug> to enable more debugging features.");
                    console.warn("If your application is designed to run on file:/// protocal, please ignore this warning.");
                }
                TNT_1.Globals.removePlugin('tntdebug');
                this.prv_isDebug = false;
            }
            let noTNTScriptTags = document.querySelectorAll("tnt-no-script");
            if (noTNTScriptTags.length !== 0) {
                console.warn("Warning: Disabling TNT script may cause some unexpected results. If you're sure you want to disabl the TNT Script feature, please ignore this warning.");
                TNT_1.Globals.removePlugin('tntscript');
            }
            let disablePluginTags = document.querySelectorAll('tnt-disable-plugin');
            for (const tag of disablePluginTags) {
                const pluginId = tag.getAttribute('plugin');
                if (pluginId !== null) {
                    TNT_1.Globals.removePlugin(pluginId);
                }
            }
            let pureModeTags = document.querySelectorAll('tnt-pure-mode');
            let noPluginModeTags = document.querySelectorAll('tnt-no-plugin');
            if (pureModeTags.length !== 0 || noPluginModeTags.length !== 0) {
                console.warn('Warning: You disabled all the plugins, including the TNT Script plugin and TNT Debugger plugin! Are you sure that\'s what you want? If not, please turn off the Pure Mode option. ');
                console.log('Hint: Use <tnt-disable-plugin plugin="plugin_id_to_delete"></tnt-disable-plugin> to disable a single plugin. \nUse <tnt-no-script></tnt-disable-plugin> to disable the TNT Script integrated plugin (equal to <tnt-disable-plugin plugin="tntscript"></tnt-disable-plugin>). Remove the <tnt-debug></tnt-debug> tag to disable the debugger plugin.');
                let pluginNames = [];
                for (const plugin of TNT_1.Globals.getAllPlugins()) {
                    pluginNames.push(plugin.id);
                }
                for (const pluginId of pluginNames) {
                    TNT_1.Globals.removePlugin(pluginId);
                }
            }
            let flipModeTags = document.querySelectorAll('tnt-flip');
            if (flipModeTags.length !== 0) {
                window.addEventListener('load', () => {
                    document.querySelector('html').style.setProperty('transform', 'scaleX(-1)');
                });
            }
        }
        render() {
            this.prv_refreshLock = true;
            for (const plugin of TNT_1.Globals.getAllPlugins()) {
                for (const tag of plugin.tags) {
                    let tagDOM = document.querySelectorAll(tag);
                    for (const el of tagDOM) {
                        try {
                            el.setAttribute("data-tnt-plugin-value-backup", el.innerHTML);
                            el.innerHTML = "";
                        }
                        catch (e) {
                        }
                    }
                }
            }
            this.prv_vTagRenderer.render();
            for (const plugin of TNT_1.Globals.getAllPlugins()) {
                for (const renderer of plugin.rendererList) {
                    renderer.render();
                }
            }
            for (const plugin of TNT_1.Globals.getAllPlugins()) {
                for (const tag of plugin.tags) {
                    let tagDOM = document.querySelectorAll(tag);
                    for (const el of tagDOM) {
                        el.innerHTML = el.getAttribute("data-tnt-plugin-value-backup");
                        el.removeAttribute("data-tnt-plugin-value-backup");
                    }
                }
            }
            this.prv_refreshLock = false;
        }
        get vTagRenderer() {
            return this.prv_vTagRenderer;
        }
    }
    TNT_1.TNT = TNT;
})(TNT || (TNT = {}));
var TNT;
(function (TNT) {
    class VTagRenderer {
        constructor(customRenderer = undefined) {
            this.customRenderer = customRenderer;
        }
        defaultRenderer(s) {
            try {
                return `${TNT.Globals.evaluate(s)}`;
            }
            catch (e) {
                return `Error while rendering element: ${e}`;
            }
        }
        render() {
            const vTags = document.querySelectorAll('v');
            for (const i of vTags) {
                const rendered = i.getAttribute("data-rendered");
                if (rendered === null) {
                    i.setAttribute("data-rendered", "YES");
                    i.setAttribute("data-original", i.innerHTML);
                    if (this.customRenderer) {
                        i.innerHTML = this.customRenderer(i.innerHTML);
                    }
                    else {
                        i.innerHTML = this.defaultRenderer(i.innerHTML);
                    }
                }
                else {
                    const content = i.getAttribute("data-original");
                    let newRenderedContent = "";
                    if (this.customRenderer) {
                        newRenderedContent = this.customRenderer(content);
                    }
                    else {
                        newRenderedContent = this.defaultRenderer(content);
                    }
                    if (i.innerHTML !== newRenderedContent) {
                        i.innerHTML = newRenderedContent;
                    }
                    else {
                    }
                }
            }
        }
    }
    TNT.VTagRenderer = VTagRenderer;
})(TNT || (TNT = {}));
var TNTScript;
(function (TNTScript) {
    class PluginMain {
        constructor() {
            this.prv_executor = new TNTScript.ScriptExecutor();
        }
        get id() {
            return "tntscript";
        }
        get rendererList() {
            return [new TNTScript.TagRenderer()];
        }
        get tags() {
            return ["tnt"];
        }
        get version() {
            return "v1.0.0-integrated";
        }
        onInit() {
            console.log("Here");
            for (const tntTag of document.querySelectorAll('tnt')) {
                this.prv_executor.exec(tntTag.innerHTML);
            }
        }
    }
    TNTScript.PluginMain = PluginMain;
})(TNTScript || (TNTScript = {}));
TNT.Globals.plug(new TNTScript.PluginMain());
var TNTScript;
(function (TNTScript) {
    class ScriptExecutor {
        exec(scriptContent) {
            console.log(scriptContent);
        }
    }
    TNTScript.ScriptExecutor = ScriptExecutor;
})(TNTScript || (TNTScript = {}));
var TNTScript;
(function (TNTScript) {
    class TagRenderer {
        render() {
            let tags = document.querySelectorAll('tnt');
            for (const tag of tags) {
                const tagInnerHTML = tag.getAttribute("data-tnt-plugin-value-backup");
                if (tag.style.getPropertyValue('display') !== "none") {
                    tag.style.setProperty('display', 'none');
                }
            }
        }
    }
    TNTScript.TagRenderer = TagRenderer;
})(TNTScript || (TNTScript = {}));
//# sourceMappingURL=tnt.js.map