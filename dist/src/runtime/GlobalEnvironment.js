import { __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { StringType, SymbolTable } from './SymbolTable.js';

var _a, _Globals_escapeString;
class Globals {
    static defaultValueEvaluator(expr) {
        const value = Globals.symbolTable.getValue(expr.trim());
        if (value.type === StringType && typeof value.value === "string") {
            return __classPrivateFieldGet(Globals, _a, "m", _Globals_escapeString).call(Globals, value.value);
        }
        return value.value;
    }
    set valueEvaluator(fn) {
        this.valueEvaluator = fn;
    }
    static evaluate(expr) {
        var _b;
        return ((_b = this.valueEvaluator) !== null && _b !== void 0 ? _b : this.defaultValueEvaluator)(expr);
    }
    static addPlugin(plugin) {
        this.pluginList.push(plugin);
    }
    static plug(plugin) {
        this.addPlugin(plugin);
    }
    static getAllPlugins() {
        return this.pluginList;
    }
    static hasPlugin(pluginId) {
        const pluginsFound = this.pluginList.filter((plugin) => {
            return plugin.id === pluginId;
        });
        return pluginsFound.length > 0;
    }
    static removePlugin(pluginId) {
        this.pluginList = this.pluginList.filter((plugin) => {
            return plugin.id !== pluginId;
        });
    }
}
_a = Globals, _Globals_escapeString = function _Globals_escapeString(str) {
    return str
        .replace(/[\n\r]/g, "\\n")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
};
Globals.symbolTable = new SymbolTable();
Globals.instances = [];
Globals.pluginList = [];

export { Globals };
//# sourceMappingURL=GlobalEnvironment.js.map
