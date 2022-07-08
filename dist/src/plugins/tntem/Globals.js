import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../../node_modules/tslib/tslib.es6.js';
import { Variable, ObjectType } from '../../runtime/SymbolTable.js';
import { Template, Component } from './Template.js';
import { symbolTable } from '../../runtime/GlobalEnvironment.js';

var _Globals_root;
class Globals {
    constructor(root) {
        this.templateSymbol = new Template();
        _Globals_root.set(this, void 0);
        __classPrivateFieldSet(this, _Globals_root, root, "f");
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
            http.send();
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
                symbolTable.setValue(traversalBody, new Variable(iter, ObjectType));
            });
        }));
    }
    addComponents(component) {
        this.templateSymbol[component.name] = component.exec;
    }
    render(dom) {
        for (const component in this.templateSymbol) {
            const componentDocument = __classPrivateFieldGet(this, _Globals_root, "f").getElementsByTagName(component);
        }
    }
}
_Globals_root = new WeakMap();

export { Globals };
//# sourceMappingURL=Globals.js.map
