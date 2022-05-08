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
    let Globals;
    (function (Globals) {
        Globals.symbolTable = new TNT.SymbolTable();
        Globals.instances = [];
        let valueEvaluator = (expr) => Globals.symbolTable.getValue(expr.trim()).value;
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
    })(Globals = TNT.Globals || (TNT.Globals = {}));
})(TNT || (TNT = {}));
var TNT;
(function (TNT_1) {
    class TNT {
        constructor() {
            TNT_1.Globals.instances.push(this);
            TNT_1.Globals.symbolTable.onSetValue(() => {
                this.render();
            });
            this.prv_vTagRenderer = new TNT_1.VTagRenderer();
            this.render();
            for (const plugin of TNT_1.Globals.getAllPlugins()) {
                console.log(`Loading plugin ${plugin.id}, version ${plugin.version}...`);
                try {
                    plugin.onInit();
                }
                catch (e) {
                    console.log(`Error whil loading plugin ${plugin.id}: ${e}`);
                    continue;
                }
                console.log(`Successfully loaded plugin ${plugin.id}`);
            }
        }
        render() {
            for (const plugin of TNT_1.Globals.getAllPlugins()) {
                for (const tag of plugin.tags) {
                    let tagDOM = document.querySelectorAll(tag);
                    for (const el of tagDOM) {
                        el.setAttribute("data-tnt-plugin-value-backup", el.innerHTML);
                        el.innerHTML = "";
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
                    if (this.customRenderer) {
                        i.innerHTML = this.customRenderer(content);
                    }
                    else {
                        i.innerHTML = this.defaultRenderer(content);
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
        get id() {
            return "tntscript";
        }
        get rendererList() {
            return [];
        }
        get tags() {
            return ["tnt"];
        }
        get version() {
            return "v1.0.0-integrated";
        }
        onInit() {
            console.log("Here");
        }
    }
    TNTScript.PluginMain = PluginMain;
})(TNTScript || (TNTScript = {}));
TNT.Globals.plug(new TNTScript.PluginMain());
class PluginMain {
    get id() {
        return "debug";
    }
    get rendererList() {
        return [];
    }
    get tags() {
        return [];
    }
    get version() {
        return "1.0.0";
    }
    onInit() {
        console.log("Init!");
    }
}
TNT.Globals.plug(new PluginMain());
//# sourceMappingURL=tnt.js.map