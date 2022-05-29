var TNTState;
(function (TNTState) {
    class Value {
        constructor(name) {
            this.name = name;
            this.valueObject = TNT.Globals.symbolTable.getValue(this.name);
        }
        setValue(value) {
            TNT.Globals.symbolTable.setValue(this.name, value);
        }
        get vlaue() {
            return this.valueObject.value;
        }
        get type() {
            return this.valueObject.type;
        }
    }
    TNTState.Value = Value;
})(TNTState || (TNTState = {}));
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
        get variableNames() {
            return Object.keys(this.prv_content);
        }
        containsVariable(variableName) {
            for (const i of this.variableNames) {
                if (i === variableName) {
                    return true;
                }
            }
            return false;
        }
        merge(anotherTable, ifExists) {
            let herNames = anotherTable.variableNames;
            for (const i of herNames) {
                if (this.containsVariable(i)) {
                    this.setValue(i, ifExists(this.getValue(i), anotherTable.getValue(i)));
                }
                else {
                    this.setValue(i, anotherTable.getValue(i));
                }
            }
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
(function (TNT) {
    class DataRenderer {
        TagDataRender() {
            this.TagDataAttributes = document.querySelectorAll("[tnt-td]");
            const domData = [];
            for (const i of this.TagDataAttributes) {
                const text = i.getAttribute('tnt-td');
                const data = this.Analysis(text);
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
        TagStyleRender() {
            this.TagDataAttributes = document.querySelectorAll("[tnt-sd]");
            const domData = [];
            for (const i of this.TagDataAttributes) {
                const text = i.getAttribute('tnt-sd');
                const data = this.Analysis(text);
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
        Analysis(t) {
            let word;
            let keyword;
            const words = [];
            let KeyValue;
            let whenKeyWord = false;
            for (const i of t) {
                if (i === ',') {
                    words.push(word);
                    word = "";
                }
                else {
                    word += i;
                }
            }
            word = "";
            for (const i of words) {
                if (i === '>') {
                    KeyValue[keyword.replace(' ', '')] = word.replace(' ', '');
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
            return KeyValue;
        }
    }
    TNT.DataRenderer = DataRenderer;
})(TNT || (TNT = {}));
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
    function codeSplit(code) {
        let ignoreNext = false;
        let stringIgnoreNext = false;
        const buffer = [];
        let currentString = "";
        for (const i of code) {
            if (ignoreNext) {
                currentString += i;
                if (i === '\\') {
                    stringIgnoreNext = true;
                    continue;
                }
                if (i === '"' && !stringIgnoreNext) {
                    ignoreNext = false;
                }
                if (stringIgnoreNext) {
                    stringIgnoreNext = false;
                }
                continue;
            }
            else {
                if (i === ';') {
                    buffer.push(currentString);
                    currentString = "";
                }
                else if (i === '"') {
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
        const v = code.replace(/\{.+\}/, '');
        const codes = /\{.+\}/.exec(code)[0];
        return [v, codeSplit(codes.substring(1, codes.length - 1))];
    }
    TNTScript.codeBlock = codeBlock;
    function keySearch(key, code) {
        return code.replace(new RegExp(`${key} `), '');
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
                if (i === '}') {
                    bracketMatchingStack.pop();
                    if (bracketMatchingStack.length === 0) {
                        buffer.push(currentString + "}");
                        bracketMatchingMode = false;
                        continue;
                    }
                }
                else if (i === '{') {
                    bracketMatchingStack.push(null);
                }
                continue;
            }
            if (ignoreNext) {
                currentString += i;
                if (i === '\\') {
                    stringIgnoreNext = true;
                    continue;
                }
                if (i === '"' && !stringIgnoreNext) {
                    ignoreNext = false;
                }
                if (stringIgnoreNext) {
                    stringIgnoreNext = false;
                }
                continue;
            }
            else {
                if (i === ',') {
                    buffer.push(currentString.trim());
                    currentString = "";
                }
                else if (i === '"') {
                    currentString += i;
                    ignoreNext = true;
                }
                else if (i === '{') {
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
                const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(' '));
                const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(' '));
                values.functioncanvalue[name[0]] = new TNTScript.ScriptExecutor().ValueProcess(v[0]);
            }
            else {
                if (original) {
                    values.agv.push(new TNTScript.ScriptExecutor().ValueProcess(value));
                }
                else {
                    values.agv.push(value);
                }
            }
        }
        return values;
    }
    TNTScript.functionSplit = functionSplit;
    function jsTypeToTNTType(TypeName) {
        switch (TypeName) {
            case "String":
                return 'string';
                break;
            case "Number":
                return 'number';
                break;
            case "Boolean":
                return 'bool';
                break;
            default:
                break;
        }
    }
    TNTScript.jsTypeToTNTType = jsTypeToTNTType;
})(TNTScript || (TNTScript = {}));
var TNTScript;
(function (TNTScript) {
    class ScriptExecutor {
        exec(scriptContent, data = new TNT.SymbolTable()) {
            this.SymbolTableOWN = data;
            ScriptRun.RunScriptCode(scriptContent, this);
        }
        ValueProcess(reg) {
            const isString = /(\"|\').+(\"|\')/;
            const isNumber = /[0-9]+/;
            const isBool = /(true|false)/;
            const isVar = /[_A-z0-9]/;
            const isMathGex = /(.+ ?(\+|-|\*|\/)+ ?.+)+/;
            const isXML = /<.+>/;
            const iscodes = /\{.+\}/;
            if (/.+\(.+\)/.test(reg)) {
                const name = /[^\(.+\)]+/.exec(reg)[0].replace(/\s*/g, "");
                if (TNT.Globals.symbolTable.getValue(name).value === 'function') {
                    let buffer = "";
                    let __parameters__ = /\(.+\)/.exec(reg);
                    let __parameter__ = __parameters__[0];
                    __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
                    const parameters = TNTScript.functionSplit(__parameter__);
                    for (const i of parameters['agv']) {
                        buffer = buffer + i;
                        buffer = buffer + ',';
                    }
                    for (const i in parameters['functioncanvalue']) {
                        buffer = buffer + i + '=' + ',';
                    }
                    const results = Function(`TNT.TNTSymbolTable.${name}.value(${buffer})`)();
                    const result = {
                        type: TNTScript.jsTypeToTNTType(typeof (results)),
                        value: results,
                    };
                    return result;
                }
                else if (TNT.Globals.symbolTable.getValue(name).value === 'tnt') {
                    let __parameters__ = /\(.+\)/.exec(reg);
                    let __parameter__ = __parameters__[0];
                    __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
                    const parameters = TNTScript.functionSplit(__parameter__);
                    let par = {};
                }
            }
            else if (iscodes.test(reg)) {
                return {
                    type: 'code',
                    value: TNTScript.codeSplit(reg.substring(1, reg.length - 1)),
                };
            }
            else if (isNumber.test(reg)) {
                return {
                    type: 'number',
                    value: Number(reg)
                };
            }
            else if (isString.test(reg)) {
            }
            else if (isBool.test(reg)) {
                return {
                    type: 'bool',
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
                const result = {
                    type: 'XML',
                    value: reg,
                };
                return result;
            }
        }
        renderDOM(HTML, DOM) {
            DOM.innerHTML = HTML;
        }
        evaluate(expression) {
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
            for (const tntTag of document.querySelectorAll('tnt')) {
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
        else if (code === 'break') {
            return "break";
        }
        else {
            this.ValueProcess(code);
        }
    }
    ScriptRun.lineRun = lineRun;
    ScriptRun.VariableCode = (code, dataobj) => {
        const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(' '));
        const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(' '));
        const process = dataobj.ValueProcess(v[0]);
        if (/let /.test(code)) {
        }
        else {
            TNT.Globals.symbolTable.setValue(process.type, process.value);
        }
    };
    ScriptRun.RenderCode = (code, dataobj) => {
        const html = TNTScript.keySearch('render', code);
    };
    ScriptRun.WhileCode = (code) => {
        const i = TNTScript.codeBlock(TNTScript.keySearch('while', code));
        const condition = i[0];
        const codes = i[1];
    };
    ScriptRun.ImportCode = (code, dataobj) => {
        const pake = TNTScript.keySearch('import', code);
        const pakege = dataobj.ValueProcess(pake);
        const http = new XMLHttpRequest();
        const filecode = http.open('GET', pakege, false);
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
                ;
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