import { __classPrivateFieldGet, __classPrivateFieldSet } from '../../node_modules/tslib/tslib.es6.js';
import TypeInfo from './TypeInfo.js';
import { Logger } from '../lib/logger.js';

var _Variable_instances, _Variable_value, _Variable_type, _Variable_logger, _Variable_validate, _SymbolTable_onSetValueHandlers, _SymbolTable_content;
const StringType = new TypeInfo("tnt", "string", "");
const NumberType = new TypeInfo("tnt", "number", 0);
const ObjectType = new TypeInfo("tnt", "object", null);
const BoolType = new TypeInfo("tnt", "bool", false);
const TNTFunctionType = new TypeInfo("tnt", "function", null);
const JSFunctionType = new TypeInfo("js", "function", () => { });
const HTMLStringType = new TypeInfo("tnt", "html_string", "<div></div>");
const TNTTypeMap = {
    string: StringType,
    number: NumberType,
    object: ObjectType,
    function: JSFunctionType,
    boolean: BoolType,
};
class Variable {
    constructor(value, type) {
        _Variable_instances.add(this);
        _Variable_value.set(this, void 0);
        _Variable_type.set(this, void 0);
        _Variable_logger.set(this, void 0);
        __classPrivateFieldGet(this, _Variable_instances, "m", _Variable_validate).call(this, value, type);
        __classPrivateFieldSet(this, _Variable_value, value, "f");
        __classPrivateFieldSet(this, _Variable_type, type, "f");
        __classPrivateFieldSet(this, _Variable_logger, new Logger("tnt-variable"), "f");
    }
    get value() {
        return __classPrivateFieldGet(this, _Variable_value, "f");
    }
    set value(value) {
        try {
            __classPrivateFieldGet(this, _Variable_instances, "m", _Variable_validate).call(this, value, __classPrivateFieldGet(this, _Variable_type, "f"));
        }
        catch (e) {
            __classPrivateFieldGet(this, _Variable_logger, "f").error(e);
            return;
        }
        __classPrivateFieldSet(this, _Variable_value, value, "f");
    }
    get type() {
        return __classPrivateFieldGet(this, _Variable_type, "f");
    }
}
_Variable_value = new WeakMap(), _Variable_type = new WeakMap(), _Variable_logger = new WeakMap(), _Variable_instances = new WeakSet(), _Variable_validate = function _Variable_validate(value, type) {
    let expectedType = null;
    if (type === StringType && typeof value !== "string") {
        expectedType = "string";
    }
    if (type === HTMLStringType && typeof value !== "string") {
        expectedType = "string";
    }
    if (type === NumberType && typeof value !== "number") {
        expectedType = "number";
    }
    if (type === JSFunctionType && typeof value !== "function") {
        expectedType = "JavaScript function";
    }
    if (type === BoolType && typeof value !== "boolean") {
        expectedType = "boolean";
    }
    if (expectedType)
        throw new TypeError(`Expected ${expectedType} but got ${typeof value}.`);
};
class SymbolTable {
    constructor() {
        _SymbolTable_onSetValueHandlers.set(this, []);
        _SymbolTable_content.set(this, {});
    }
    getValue(key) {
        return __classPrivateFieldGet(this, _SymbolTable_content, "f")[key];
    }
    setValue(key, v) {
        __classPrivateFieldGet(this, _SymbolTable_content, "f")[key] = v;
        __classPrivateFieldGet(this, _SymbolTable_onSetValueHandlers, "f").forEach((eventHandler) => eventHandler());
    }
    remove(key) {
        delete __classPrivateFieldGet(this, _SymbolTable_content, "f")[key];
    }
    onSetValue(handler) {
        __classPrivateFieldGet(this, _SymbolTable_onSetValueHandlers, "f").push(handler);
    }
    containsVariable(variableName) {
        return this.variableNames.indexOf(variableName) >= 0;
    }
    merge(anotherTable, ifExists) {
        anotherTable.variableNames.forEach((variable) => {
            const newValue = this.containsVariable(variable) ?
                ifExists(this.getValue(variable), anotherTable.getValue(variable)) :
                anotherTable.getValue(variable);
            this.setValue(variable, newValue);
        });
    }
    get variableNames() {
        return Object.keys(__classPrivateFieldGet(this, _SymbolTable_content, "f"));
    }
}
_SymbolTable_onSetValueHandlers = new WeakMap(), _SymbolTable_content = new WeakMap();
function jsType2TNT(jsType) {
    if (Reflect.has(TNTTypeMap, jsType))
        return TNTTypeMap[jsType];
    return ObjectType;
}

export { BoolType, HTMLStringType, JSFunctionType, NumberType, ObjectType, StringType, SymbolTable, TNTFunctionType, TNTTypeMap, Variable, jsType2TNT };
//# sourceMappingURL=SymbolTable.js.map
