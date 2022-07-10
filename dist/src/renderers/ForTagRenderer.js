import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { evaluate } from '../runtime/GlobalEnvironment.js';
import { SymbolTable, ObjectType } from '../runtime/SymbolTable.js';
import { Variable } from '../index.js';
import VTagRenderer from './VTagRenderer.js';

var _ForTagRenderer_instances, _ForTagRenderer_customRenderer, _ForTagRenderer_root, _ForTagRenderer_symbolTable, _ForTagRenderer_tagChildren, _ForTagRenderer_parseOperation, _ForTagRenderer_generateTagId;
class ForTagRenderer {
    constructor(root, symbolTable, customRenderer) {
        _ForTagRenderer_instances.add(this);
        _ForTagRenderer_customRenderer.set(this, void 0);
        _ForTagRenderer_root.set(this, void 0);
        _ForTagRenderer_symbolTable.set(this, void 0);
        _ForTagRenderer_tagChildren.set(this, void 0);
        __classPrivateFieldSet(this, _ForTagRenderer_root, root, "f");
        __classPrivateFieldSet(this, _ForTagRenderer_symbolTable, symbolTable, "f");
        __classPrivateFieldSet(this, _ForTagRenderer_customRenderer, customRenderer, "f");
        __classPrivateFieldSet(this, _ForTagRenderer_tagChildren, {}, "f");
        this.defaultRenderer = this.defaultRenderer.bind(this);
    }
    defaultRenderer(parentVariable, localVariableName, childElement, parentElement) {
        if (!Array.isArray(parentVariable)) {
            return `[ERROR] Cannot use non-array variables in <t-for />. Excepted Array, got ${typeof parentVariable}.`;
        }
        parentElement.innerHTML = "";
        parentVariable.forEach((item) => {
            const customSymbolTable = new SymbolTable();
            const currentVariable = new Variable(customSymbolTable, localVariableName, ObjectType);
            const currentId = __classPrivateFieldGet(this, _ForTagRenderer_instances, "m", _ForTagRenderer_generateTagId).call(this);
            currentVariable.setValue(item);
            customSymbolTable.merge(__classPrivateFieldGet(this, _ForTagRenderer_symbolTable, "f"), (oldValue) => oldValue);
            childElement.setAttribute("data-id", currentId);
            parentElement.appendChild(childElement.cloneNode(true));
            const customVTagRenderer = new VTagRenderer(parentElement.querySelector(`[data-id="${currentId}"]`), customSymbolTable);
            customVTagRenderer.render();
        });
    }
    render() {
        var _a;
        const forTags = __classPrivateFieldGet(this, _ForTagRenderer_root, "f").querySelectorAll("t-for");
        const render = (_a = __classPrivateFieldGet(this, _ForTagRenderer_customRenderer, "f")) !== null && _a !== void 0 ? _a : this.defaultRenderer;
        console.log(forTags);
        forTags.forEach((tag) => {
            const rendered = tag.getAttribute("data-rendered");
            if (rendered === null) {
                const tagId = __classPrivateFieldGet(this, _ForTagRenderer_instances, "m", _ForTagRenderer_generateTagId).call(this);
                tag.setAttribute("data-rendered", "YES");
                tag.setAttribute("data-id", tagId);
                __classPrivateFieldGet(this, _ForTagRenderer_tagChildren, "f")[tagId] = tag.children[0];
                tag.setAttribute("data-original", tag.getAttribute("data"));
                tag.removeAttribute("data");
                const { parentVariableValue, localVariableName } = __classPrivateFieldGet(this, _ForTagRenderer_instances, "m", _ForTagRenderer_parseOperation).call(this, tag);
                const renderedContent = render(parentVariableValue, localVariableName, __classPrivateFieldGet(this, _ForTagRenderer_tagChildren, "f")[tagId], tag);
                if (renderedContent)
                    tag.innerHTML = renderedContent;
            }
            const { parentVariableValue, localVariableName } = __classPrivateFieldGet(this, _ForTagRenderer_instances, "m", _ForTagRenderer_parseOperation).call(this, tag);
            const newlyRenderedContent = render(parentVariableValue, localVariableName, __classPrivateFieldGet(this, _ForTagRenderer_tagChildren, "f")[tag.getAttribute("data-id")], tag);
            if (newlyRenderedContent)
                tag.innerHTML = newlyRenderedContent;
        });
    }
}
_ForTagRenderer_customRenderer = new WeakMap(), _ForTagRenderer_root = new WeakMap(), _ForTagRenderer_symbolTable = new WeakMap(), _ForTagRenderer_tagChildren = new WeakMap(), _ForTagRenderer_instances = new WeakSet(), _ForTagRenderer_parseOperation = function _ForTagRenderer_parseOperation(tag) {
    const forOperation = tag
        .getAttribute("data-original")
        .split(" in ", 2);
    const localVariableName = forOperation[0], parentVariableName = forOperation[1];
    const parentVariableValue = evaluate(__classPrivateFieldGet(this, _ForTagRenderer_symbolTable, "f"), parentVariableName);
    return { localVariableName, parentVariableValue };
}, _ForTagRenderer_generateTagId = function _ForTagRenderer_generateTagId() {
    return (Math.random() + 1).toString(36).substring(7);
};

export { ForTagRenderer as default };
//# sourceMappingURL=ForTagRenderer.js.map
