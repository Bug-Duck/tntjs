import { __classPrivateFieldGet, __classPrivateFieldSet } from '../../../node_modules/tslib/tslib.es6.js';
import { Variable, ObjectType } from '../../runtime/SymbolTable.js';
import { Template, Component } from './Template.js';
import { Globals as Globals$1 } from '../../runtime/GlobalEnvironment.js';

var _Globals_templateSymbol;
class Globals {
    constructor() {
        _Globals_templateSymbol.set(this, new Template());
        this.addComponents(new Component("get", (dom) => {
            const http = new XMLHttpRequest();
            http.open("GET", dom.innerHTML, true);
            http.onreadystatechange = () => {
                if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                    dom.innerHTML = http.responseText;
                }
            };
        }));
        this.addComponents(new Component("post", (dom) => {
            const http = new XMLHttpRequest();
            http.open("POST", dom.innerHTML, true);
            http.onreadystatechange = () => {
                if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                    dom.innerHTML = http.responseText;
                }
            };
        }));
        this.addComponents(new Component("if", (dom, comparisonValue, condition, valueBeingCompared) => {
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
        this.addComponents(new Component("for", (dom, traversalBody, way, iterateOverObject) => {
            const HTMLCodes = dom.innerHTML;
            [...iterateOverObject].forEach((iter, key) => {
                Globals$1.symbolTable.setValue(traversalBody, new Variable(iter, ObjectType));
            });
        }));
    }
    get templateSymbol() {
        return __classPrivateFieldGet(this, _Globals_templateSymbol, "f");
    }
    set templateSymbol(value) {
        __classPrivateFieldSet(this, _Globals_templateSymbol, value, "f");
    }
    addComponents(component) {
        __classPrivateFieldGet(this, _Globals_templateSymbol, "f")[component.name] = component.exec;
    }
    render(dom) {
        for (const component in __classPrivateFieldGet(this, _Globals_templateSymbol, "f")) {
            const componentDocument = document.getElementsByTagName(component);
        }
    }
}
_Globals_templateSymbol = new WeakMap();

export { Globals };
//# sourceMappingURL=Globals.js.map
