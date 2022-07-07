import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../../node_modules/tslib/tslib.es6.js';

var _Component_name;
class Template {
}
class Component {
    constructor(name, ComponentExec) {
        _Component_name.set(this, void 0);
        __classPrivateFieldSet(this, _Component_name, name, "f");
        this.exec = ComponentExec;
    }
    exec(dom, ...par) {
    }
    get name() {
        return __classPrivateFieldGet(this, _Component_name, "f");
    }
    set name(value) {
        __classPrivateFieldSet(this, _Component_name, value, "f");
    }
}
_Component_name = new WeakMap();

export { Component, Template };
//# sourceMappingURL=Template.js.map
