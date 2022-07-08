import { __classPrivateFieldSet, __classPrivateFieldGet } from '../node_modules/tslib/tslib.es6.js';
import './plugins/debug/index.js';
import './plugins/tntem/index.js';
import './plugins/tntscript/index.js';
import { Logger } from './lib/logger.js';
import { Variable as Variable$1, SymbolTable } from './runtime/SymbolTable.js';
export { BoolType, HTMLStringType, JSFunctionType, NumberType, ObjectType, StringType, TNTFunctionType } from './runtime/SymbolTable.js';
import TNT from './runtime/TNT.js';

var _Variable_logger, _Variable_symbolTable, _TNTApp_root;
class Variable {
    constructor(symbolTable, name, type) {
        _Variable_logger.set(this, new Logger("tntjs"));
        _Variable_symbolTable.set(this, void 0);
        this.name = name;
        this.variableBase = new Variable$1(type.defaultValue, type);
        __classPrivateFieldSet(this, _Variable_symbolTable, symbolTable, "f");
    }
    setValue(value) {
        __classPrivateFieldGet(this, _Variable_logger, "f").debug(`Setting value ${value} for variable ${this.name}...`);
        this.variableBase.value = value;
        __classPrivateFieldGet(this, _Variable_symbolTable, "f").setValue(this.name, this.variableBase);
        __classPrivateFieldGet(this, _Variable_logger, "f").debug(`Set value ${value} for variable ${this.name}.`);
        return this;
    }
    delete() {
        __classPrivateFieldGet(this, _Variable_logger, "f").debug(`Deleting variable ${this.name}...`);
        __classPrivateFieldGet(this, _Variable_symbolTable, "f").remove(this.name);
        __classPrivateFieldGet(this, _Variable_logger, "f").debug(`Deleted variable ${this.name}.`);
    }
    get value() {
        return this.variableBase.value;
    }
    get type() {
        return this.variableBase.type;
    }
}
_Variable_logger = new WeakMap(), _Variable_symbolTable = new WeakMap();
class TNTApp {
    constructor(root) {
        _TNTApp_root.set(this, void 0);
        __classPrivateFieldSet(this, _TNTApp_root, root, "f");
        this.symbolTable = new SymbolTable();
        this.TNT = new TNT(__classPrivateFieldGet(this, _TNTApp_root, "f"), this.symbolTable);
        this.variables = {};
    }
    data(variables) {
        for (const variableName in variables) {
            const variable = variables[variableName];
            this.variables[variableName] = new Variable(this.symbolTable, variableName, variable.type);
            this.variables[variableName].setValue(variable.value);
        }
    }
    addPlugins(plugins) {
        this.TNT.addPlugins(plugins);
    }
    removePlugins(pluginIds) {
        this.TNT.disablePlugins(pluginIds);
    }
}
_TNTApp_root = new WeakMap();

export { TNTApp as default };
//# sourceMappingURL=index.js.map
