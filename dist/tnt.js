var TemplateLanguage;
(function (TemplateLanguage) {
    class Template {
    }
    TemplateLanguage.Template = Template;
    class Component {
        constructor(name, ComponentExec) {
            this.name = name;
            this.exec = ComponentExec;
        }
    }
    TemplateLanguage.Component = Component;
})(TemplateLanguage || (TemplateLanguage = {}));
var TemplateLanguage;
(function (TemplateLanguage) {
    let Globals;
    (function (Globals) {
        Globals.templateSymbol = new TemplateLanguage.Template();
        Globals.addComponents = (compon) => {
            Globals.templateSymbol[compon.name] = compon.exec;
        };
        Globals.render = (dom) => {
            for (const component in Globals.templateSymbol) {
                const componentDocument = document.getElementsByTagName(component);
            }
        };
        Globals.addComponents(new TemplateLanguage.Component("get", (dom) => {
            const http = new XMLHttpRequest();
            dom.innerHTML = http.open("GET", dom.innerHTML, true);
        }));
        Globals.addComponents(new TemplateLanguage.Component("post", (dom) => {
            const http = new XMLHttpRequest();
            dom.innerHTML = http.open("POST", dom.innerHTML, true);
        }));
        Globals.addComponents(new TemplateLanguage.Component("if", (dom, comparisonValue, condition, valueBeingCompared) => {
            const HTMLCodes = dom.innerHTML;
            const be = [];
            switch (be[1]) {
                case "equals":
                    if (be[0] === be[1]) { }
                    break;
                case "unequls":
                    if (be[0] !== be[2]) { }
                    break;
            }
        }));
        Globals.addComponents(new TemplateLanguage.Component("for", (dom, traversalBody, way, iterateOverObject) => {
            const HTMLCodes = dom.innerHTML;
            iterateOverObject.forEach((iter, key) => {
                TNT.Globals.symbolTable.setValue(traversalBody, new TNT.Variable(iter, TNT.ObjectType));
            });
        }));
    })(Globals = TemplateLanguage.Globals || (TemplateLanguage.Globals = {}));
})(TemplateLanguage || (TemplateLanguage = {}));
var TemplateLanguage;
(function (TemplateLanguage) {
    class TemplateRenderer {
        render() {
        }
    }
    TemplateLanguage.TemplateRenderer = TemplateRenderer;
})(TemplateLanguage || (TemplateLanguage = {}));
var TemplateLanguage;
(function (TemplateLanguage) {
    class PluginMain {
        get id() {
            return "temlang";
        }
        get rendererList() {
            return [new TemplateLanguage.TemplateRenderer()];
        }
        get tags() {
            return [];
        }
        get version() {
            return "1.0.0-integrated";
        }
        onInit() {
            const testst = document.getElementsByTagName("p");
            for (const i of testst) {
                i.innerHTML = "testst";
            }
        }
    }
    TemplateLanguage.PluginMain = PluginMain;
})(TemplateLanguage || (TemplateLanguage = {}));
TNT.Globals.plug(new TemplateLanguage.PluginMain());
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
        constructor(namespaceName, typeName, defaultValue) {
            this.prv_namespaceName = namespaceName;
            this.prv_typeName = typeName;
            this.prv_defaultValue = defaultValue;
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
        get defaultValue() {
            return this.prv_defaultValue;
        }
    }
    TNT.TypeInfo = TypeInfo;
})(TNT || (TNT = {}));
var TNT;
(function (TNT) {
    TNT.StringType = new TNT.TypeInfo("tnt", "string", "");
    TNT.NumberType = new TNT.TypeInfo("tnt", "number", 0);
    TNT.ObjectType = new TNT.TypeInfo("tnt", "object", null);
    TNT.TNTFunctionType = new TNT.TypeInfo("tnt", "function", null);
    TNT.JSFunctionType = new TNT.TypeInfo("js", "function", () => { });
    TNT.HTMLStringType = new TNT.TypeInfo("tnt", "html_string", "<div></div>");
    TNT.jsTypeToTNT = {
        "string": TNT.StringType,
        "number": TNT.NumberType,
        "object": TNT.ObjectType,
        "function": TNT.JSFunctionType,
    };
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
        get variableNames() {
            return Object.keys(this.prv_content);
        }
        containsVariable(variableName) {
            return -1 !== this.variableNames.indexOf(variableName);
        }
        merge(anotherTable, ifExists) {
            for (const i of anotherTable.variableNames) {
                this.setValue(i, this.containsVariable(i) ? ifExists(this.getValue(i), anotherTable.getValue(i)) : anotherTable.getValue(i));
            }
        }
    }
    TNT.SymbolTable = SymbolTable;
    function jsType2TNT(jsType) {
        for (const i in TNT.jsTypeToTNT) {
            if (i === jsType) {
                return TNT.jsTypeToTNT[i];
            }
        }
        return TNT.ObjectType;
    }
    TNT.jsType2TNT = jsType2TNT;
})(TNT || (TNT = {}));
var TNT;
(function (TNT) {
    let Globals;
    (function (Globals) {
        Globals.symbolTable = new TNT.SymbolTable();
        Globals.instances = [];
        let valueEvaluator = (expr) => {
            const value = Globals.symbolTable.getValue(expr.trim());
            if (value.type === TNT.StringType) {
                return value.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
        function hasPlugin(pluginId) {
            for (const plugin of prv_pluginList) {
                if (plugin.id === pluginId) {
                    return true;
                }
            }
            return false;
        }
        Globals.hasPlugin = hasPlugin;
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
var TNTSimpApi;
(function (TNTSimpApi) {
    class PluginMain {
        get id() {
            return "tntjsapi-simp";
        }
        get rendererList() {
            return [];
        }
        get tags() {
            return [];
        }
        get version() {
            return "1.0.0-integrated";
        }
        onInit() { }
    }
    TNTSimpApi.PluginMain = PluginMain;
    class Value {
        constructor(name, type) {
            this.name = name;
            this.valueObject = new TNT.Variable(type.defaultValue, type);
        }
        setValue(value) {
            if (TNT.Globals.hasPlugin("tntdebug")) {
                console.log(`[tntjsapi-simp] Setting value ${value} for variable ${this.name}...`);
            }
            this.valueObject.value = value;
            TNT.Globals.symbolTable.setValue(this.name, this.valueObject);
            if (TNT.Globals.hasPlugin("tntdebug")) {
                console.log(`[tntjsapi-simp] Set value ${value} for variable ${this.name}.`);
            }
            return this;
        }
        get value() {
            return this.valueObject.value;
        }
        get type() {
            return this.valueObject.type;
        }
    }
    TNTSimpApi.Value = Value;
})(TNTSimpApi || (TNTSimpApi = {}));
TNT.Globals.plug(new TNTSimpApi.PluginMain());
var TNTScript;
(function (TNTScript) {
    class ScriptExecutor {
        exec(scriptContent, data = new TNT.SymbolTable()) {
            this.SymbolTableOWN = data;
            ScriptRun.RunScriptCode(scriptContent, this);
        }
        ValueProcess(reg) {
            const isString = /("|').+("|')/;
            const isNumber = /[0-9]+/;
            const isBool = /(true|false)/;
            const isVar = /[_A-z0-9]/;
            const isMathGex = /(.+ ?(\+|-|\*|\/)+ ?.+)+/;
            const isXML = /<.+>/;
            const iscodes = /\{.+\}/;
            if (/.+\(.+\)/.test(reg)) {
                const name = /[^(.+)]+/.exec(reg)[0].replace(/\s*/g, "");
                if (TNT.Globals.symbolTable.getValue(name).value === "function") {
                    let buffer = "";
                    const __parameters__ = /\(.+\)/.exec(reg);
                    let __parameter__ = __parameters__[0];
                    __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
                    const parameters = TNTScript.functionSplit(__parameter__);
                    for (const i of parameters["agv"]) {
                        buffer = buffer + i;
                        buffer = buffer + ",";
                    }
                    for (const i in parameters["functioncanvalue"]) {
                        buffer = buffer + i + "=" + ",";
                    }
                    const results = Function(`TNT.TNTSymbolTable.${name}.value(${buffer})`)();
                    const result = {
                        type: TNTScript.jsTypeToTNTType(typeof (results)),
                        value: results,
                    };
                    return result;
                }
                else if (TNT.Globals.symbolTable.getValue(name).value === "tnt") {
                    const __parameters__ = /\(.+\)/.exec(reg);
                    let __parameter__ = __parameters__[0];
                    __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
                    const parameters = TNTScript.functionSplit(__parameter__);
                    const par = {};
                }
            }
            else if (iscodes.test(reg)) {
                return {
                    type: "code",
                    value: TNTScript.codeSplit(reg.substring(1, reg.length - 1)),
                };
            }
            else if (isNumber.test(reg)) {
                return {
                    type: "number",
                    value: Number(reg)
                };
            }
            else if (isString.test(reg)) {
            }
            else if (isBool.test(reg)) {
                return {
                    type: "bool",
                    value: Boolean(reg),
                };
            }
            else if (isVar.test(reg)) {
                const results = TNT.Globals.symbolTable.getValue(reg).value;
                const result = {
                    type: TNTScript.jsTypeToTNTType(typeof (results)),
                    value: results,
                };
                return result;
            }
            else if (isMathGex.test(reg)) {
            }
            else if (isXML.test(reg)) {
                return {
                    type: "XML",
                    value: reg,
                };
            }
        }
        renderDOM(HTML, DOM) {
            DOM.innerHTML = HTML;
        }
        evaluate(expression) {
            const value = TNT.Globals.symbolTable.getValue(expression.trim());
            if (value.type === TNT.StringType) {
                return value.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
            return value.value;
        }
    }
    TNTScript.ScriptExecutor = ScriptExecutor;
})(TNTScript || (TNTScript = {}));
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
            for (const tntTag of document.querySelectorAll("tnt")) {
                this.prv_executor.exec(tntTag.innerHTML);
            }
            TNT.Globals.setValueEvaluator((e) => {
                return this.prv_executor.evaluate(e);
            });
        }
    }
    TNTScript.PluginMain = PluginMain;
})(TNTScript || (TNTScript = {}));
TNT.Globals.plug(new TNTScript.PluginMain());
var ScriptRun;
(function (ScriptRun) {
    function RunScriptCode(codes, dataobj) {
        const codeList = init(codes);
        let index = 1;
        for (const code of codeList) {
            lineRun(code);
            index += 1;
        }
        return dataobj.SymbolTableOWN;
    }
    ScriptRun.RunScriptCode = RunScriptCode;
    function init(codes) {
        const list = TNTScript.codeSplit(codes);
        return list;
    }
    ScriptRun.init = init;
    function lineRun(code) {
        if (/([A-z0-9])+ ?= ?.+/.test(code)) {
            ScriptRun.VariableCode(code, this);
        }
        else if (/(for|while|def|render|when) .+/.test(code)) {
            if (/render/.test(code)) {
                ScriptRun.RenderCode(code, this);
            }
            else if (/while/.test(code)) {
                ScriptRun.WhileCode(code);
            }
            else if (/def/.test(code)) {
            }
            else if (/for/.test(code)) {
            }
        }
        else if (code === "break") {
            return "break";
        }
        else {
            this.ValueProcess(code);
        }
    }
    ScriptRun.lineRun = lineRun;
    ScriptRun.VariableCode = (code, dataobj) => {
        const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(" "));
        const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(" "));
        const process = dataobj.ValueProcess(v[0]);
        if (/let /.test(code)) {
        }
        else {
            TNT.Globals.symbolTable.setValue(process.type, process.value);
        }
    };
    ScriptRun.RenderCode = (code, dataobj) => {
        const html = TNTScript.keySearch("render", code);
    };
    ScriptRun.WhileCode = (code) => {
        const i = TNTScript.codeBlock(TNTScript.keySearch("while", code));
        const condition = i[0];
        const codes = i[1];
    };
    ScriptRun.ImportCode = (code, dataobj) => {
        const pake = TNTScript.keySearch("import", code);
        const pakege = dataobj.ValueProcess(pake);
        const http = new XMLHttpRequest();
        const filecode = http.open("GET", pakege, false);
        const Variable = RunScriptCode(filecode, dataobj);
        TNT.Globals.symbolTable.merge(Variable, (TNT.Globals.symbolTable.getValue("w").value));
    };
})(ScriptRun || (ScriptRun = {}));
var TNTScript;
(function (TNTScript) {
    class ScriptSymbolTable extends TNT.SymbolTable {
        constructor() {
            super();
            this.print = (text) => {
                console.log(text);
            };
            this.sleep = (time) => {
                setTimeout(() => { }, time * 1000);
            };
            this.range = (startIndex = 0, endIndex) => {
                const result = [];
                let i = startIndex;
                while (i == endIndex) {
                    result.push(i);
                    i += 1;
                }
                return result;
            };
        }
    }
    TNTScript.ScriptSymbolTable = ScriptSymbolTable;
    let Globals;
    (function (Globals) {
        Globals.scriptsymboltable = new ScriptSymbolTable();
    })(Globals = TNTScript.Globals || (TNTScript.Globals = {}));
})(TNTScript || (TNTScript = {}));
var TNTScript;
(function (TNTScript) {
    class TagRenderer {
        render() {
            const tags = document.querySelectorAll("tnt");
            for (const tag of tags) {
                const tagInnerHTML = tag.getAttribute("data-tnt-plugin-value-backup");
                if (tag.style.getPropertyValue("display") !== "none") {
                    tag.style.setProperty("display", "none");
                }
            }
        }
    }
    TNTScript.TagRenderer = TagRenderer;
})(TNTScript || (TNTScript = {}));
var TNTScript;
(function (TNTScript) {
    function codeSplit(code) {
        let ignoreNext = false;
        let stringIgnoreNext = false;
        const buffer = [];
        let currentString = "";
        for (const i of code) {
            if (ignoreNext) {
                currentString += i;
                if (i === "\\") {
                    stringIgnoreNext = true;
                    continue;
                }
                if (i === "\"" && !stringIgnoreNext) {
                    ignoreNext = false;
                }
                if (stringIgnoreNext) {
                    stringIgnoreNext = false;
                }
                continue;
            }
            else {
                if (i === ";") {
                    buffer.push(currentString);
                    currentString = "";
                }
                else if (i === "\"") {
                    currentString += i;
                    ignoreNext = true;
                }
                else {
                    currentString += i;
                }
            }
        }
        if (currentString !== "") {
            buffer.push(currentString);
            currentString = "";
        }
        return buffer;
    }
    TNTScript.codeSplit = codeSplit;
    function codeBlock(code) {
        const v = code.replace(/\{.+\}/, "");
        const codes = /\{.+\}/.exec(code)[0];
        return [v, codeSplit(codes.substring(1, codes.length - 1))];
    }
    TNTScript.codeBlock = codeBlock;
    function keySearch(key, code) {
        return code.replace(new RegExp(`${key} `), "");
    }
    TNTScript.keySearch = keySearch;
    function functionSplit(code, original = false) {
        let ignoreNext = false;
        let stringIgnoreNext = false;
        let bracketMatchingMode = false;
        let bracketMatchingStack = [];
        const buffer = [];
        let currentString = "";
        for (const i of code) {
            if (bracketMatchingMode) {
                currentString += i;
                if (i === "}") {
                    bracketMatchingStack.pop();
                    if (bracketMatchingStack.length === 0) {
                        buffer.push(currentString + "}");
                        bracketMatchingMode = false;
                        continue;
                    }
                }
                else if (i === "{") {
                    bracketMatchingStack.push(null);
                }
                continue;
            }
            if (ignoreNext) {
                currentString += i;
                if (i === "\\") {
                    stringIgnoreNext = true;
                    continue;
                }
                if (i === "\"" && !stringIgnoreNext) {
                    ignoreNext = false;
                }
                if (stringIgnoreNext) {
                    stringIgnoreNext = false;
                }
                continue;
            }
            else {
                if (i === ",") {
                    buffer.push(currentString.trim());
                    currentString = "";
                }
                else if (i === "\"") {
                    currentString += i;
                    ignoreNext = true;
                }
                else if (i === "{") {
                    bracketMatchingMode = true;
                    bracketMatchingStack = [null];
                    currentString += i;
                }
                else {
                    currentString += i;
                }
            }
        }
        if (currentString !== "") {
            buffer.push(currentString.trim());
            currentString = "";
        }
        const values = { agv: [], functioncanvalue: {} };
        for (const value of buffer) {
            if (/.+ ?= ?.+/.test(value)) {
                const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(" "));
                const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(" "));
                values.functioncanvalue[name[0]] = new TNTScript.ScriptExecutor().ValueProcess(v[0]);
            }
            else {
                values.agv.push(original ? new TNTScript.ScriptExecutor().ValueProcess(value) : value);
            }
        }
        return values;
    }
    TNTScript.functionSplit = functionSplit;
    function jsTypeToTNTType(TypeName) {
        return ({
            "String": "string",
            "Number": "number",
            "Boolean": "bool",
        })[TypeName];
    }
    TNTScript.jsTypeToTNTType = jsTypeToTNTType;
})(TNTScript || (TNTScript = {}));
var TNT;
(function (TNT) {
    class DataRenderer {
        tagDataRender() {
            this.prv_tagDataAttributes = document.querySelectorAll("[tnt-td]");
            const domData = [];
            for (const i of this.prv_tagDataAttributes) {
                const text = i.getAttribute("tnt-td");
                const data = this.analysis(text);
                domData.push([i, data]);
            }
            TNT.Globals.symbolTable.onSetValue(() => {
                for (const i of domData) {
                    for (const d of i[1]) {
                        i[0][d] = i[1][d];
                    }
                }
            });
        }
        tagStyleRender() {
            this.prv_tagDataAttributes = document.querySelectorAll("[tnt-sd]");
            const domData = [];
            for (const i of this.prv_tagDataAttributes) {
                const text = i.getAttribute("tnt-sd");
                const data = this.analysis(text);
                domData.push([i, data]);
            }
            TNT.Globals.symbolTable.onSetValue(() => {
                for (const i of domData) {
                    for (const d of i[1]) {
                        i[0].style[d] = i[1][d];
                    }
                }
            });
        }
        analysis(t) {
            let word;
            let keyword;
            const words = [];
            let keyValue;
            let whenKeyWord = false;
            for (const i of t) {
                if (i === ",") {
                    words.push(word);
                    word = "";
                }
                else {
                    word += i;
                }
            }
            word = "";
            for (const i of words) {
                if (i === ">") {
                    keyValue[keyword.replace(" ", "")] = word.replace(" ", "");
                    keyword = "";
                    word = "";
                    whenKeyWord = false;
                }
                else {
                    if (whenKeyWord) {
                        keyword += i;
                    }
                    else {
                        word += i;
                    }
                }
            }
            return keyValue;
        }
    }
    TNT.DataRenderer = DataRenderer;
})(TNT || (TNT = {}));
var TNT;
(function (TNT) {
    class StaticVTagRenderer {
        constructor(customRenderer = undefined) {
            this.prv_firstRendering = true;
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
            var _a, _b;
            if (this.prv_firstRendering) {
                const svTags = document.querySelectorAll("sv");
                for (const i of svTags) {
                    i.innerHTML = (_b = (_a = this.customRenderer) === null || _a === void 0 ? void 0 : _a.call(this, i.innerHTML)) !== null && _b !== void 0 ? _b : this.defaultRenderer(i.innerHTML);
                }
            }
            this.prv_firstRendering = true;
        }
    }
    TNT.StaticVTagRenderer = StaticVTagRenderer;
})(TNT || (TNT = {}));
//# sourceMappingURL=tnt.js.map