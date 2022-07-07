import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';

var _TypeInfo_namespaceName, _TypeInfo_typeName, _TypeInfo_defaultValue;
class TypeInfo {
    constructor(namespaceName, typeName, defaultValue) {
        _TypeInfo_namespaceName.set(this, void 0);
        _TypeInfo_typeName.set(this, void 0);
        _TypeInfo_defaultValue.set(this, void 0);
        __classPrivateFieldSet(this, _TypeInfo_namespaceName, namespaceName, "f");
        __classPrivateFieldSet(this, _TypeInfo_typeName, typeName, "f");
        __classPrivateFieldSet(this, _TypeInfo_defaultValue, defaultValue, "f");
    }
    toString() {
        return `${__classPrivateFieldGet(this, _TypeInfo_namespaceName, "f")}:type.${__classPrivateFieldGet(this, _TypeInfo_typeName, "f")}`;
    }
    get name() {
        return __classPrivateFieldGet(this, _TypeInfo_typeName, "f");
    }
    get owner() {
        return __classPrivateFieldGet(this, _TypeInfo_typeName, "f");
    }
    get defaultValue() {
        return __classPrivateFieldGet(this, _TypeInfo_defaultValue, "f");
    }
    set defaultValue(value) {
        __classPrivateFieldSet(this, _TypeInfo_defaultValue, value, "f");
    }
}
_TypeInfo_namespaceName = new WeakMap(), _TypeInfo_typeName = new WeakMap(), _TypeInfo_defaultValue = new WeakMap();

export { TypeInfo as default };
//# sourceMappingURL=TypeInfo.js.map
