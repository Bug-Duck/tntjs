import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { generateId, getParentNodes, removeNodesWithParents } from '../lib/common.js';
import { TNTInstances, evaluate } from '../runtime/GlobalEnvironment.js';
import { SymbolTable, ObjectType } from '../runtime/SymbolTable.js';
import TNT from '../runtime/TNT.js';
import { Variable } from '../index.js';

var _ForTagRenderer_instances, _ForTagRenderer_customRenderer, _ForTagRenderer_root, _ForTagRenderer_symbolTable, _ForTagRenderer_tagChildren, _ForTagRenderer_TNTInstances, _ForTagRenderer_elementIds, _ForTagRenderer_parseOperation, _ForTagRenderer_validateElements;
class ForTagRenderer {
    constructor(root, symbolTable, customRenderer) {
        _ForTagRenderer_instances.add(this);
        _ForTagRenderer_customRenderer.set(this, void 0);
        _ForTagRenderer_root.set(this, void 0);
        _ForTagRenderer_symbolTable.set(this, void 0);
        _ForTagRenderer_tagChildren.set(this, void 0);
        _ForTagRenderer_TNTInstances.set(this, void 0);
        _ForTagRenderer_elementIds.set(this, void 0);
        __classPrivateFieldSet(this, _ForTagRenderer_root, root, "f");
        __classPrivateFieldSet(this, _ForTagRenderer_symbolTable, symbolTable, "f");
        __classPrivateFieldSet(this, _ForTagRenderer_customRenderer, customRenderer, "f");
        __classPrivateFieldSet(this, _ForTagRenderer_tagChildren, {}, "f");
        __classPrivateFieldSet(this, _ForTagRenderer_TNTInstances, {}, "f");
        __classPrivateFieldSet(this, _ForTagRenderer_elementIds, {}, "f");
        this.defaultRenderer = this.defaultRenderer.bind(this);
    }
    defaultRenderer(parentVariable, localVariableName, childElement, parentElement) {
        if (!Array.isArray(parentVariable)) {
            return `[ERROR] Cannot use non-array variables in <t-for />. Excepted Array, got ${typeof parentVariable}.`;
        }
        if (!childElement) {
            return "[ERROR] Child elements must not be undefined.";
        }
        for (const TNTInstance in __classPrivateFieldGet(this, _ForTagRenderer_TNTInstances, "f")) {
            const currentIndex = TNTInstances.indexOf(__classPrivateFieldGet(this, _ForTagRenderer_TNTInstances, "f")[TNTInstance]);
            TNTInstances.splice(currentIndex, currentIndex);
        }
        __classPrivateFieldSet(this, _ForTagRenderer_TNTInstances, {}, "f");
        parentElement.innerHTML = "";
        parentVariable.forEach((item, index) => {
            var _a, _b;
            const customSymbolTable = new SymbolTable();
            const currentVariable = new Variable(customSymbolTable, localVariableName, ObjectType);
            const currentId = (_a = __classPrivateFieldGet(this, _ForTagRenderer_elementIds, "f")[index]) !== null && _a !== void 0 ? _a : generateId();
            if (!__classPrivateFieldGet(this, _ForTagRenderer_elementIds, "f")[index]) {
                __classPrivateFieldGet(this, _ForTagRenderer_elementIds, "f")[index] = currentId;
            }
            currentVariable.setValue(item);
            customSymbolTable.merge(__classPrivateFieldGet(this, _ForTagRenderer_symbolTable, "f"), (oldValue) => oldValue);
            childElement.setAttribute("data-id", currentId);
            parentElement.appendChild(childElement.cloneNode(true));
            const currentTNTInstance = (_b = __classPrivateFieldGet(this, _ForTagRenderer_TNTInstances, "f")[currentId]) !== null && _b !== void 0 ? _b : new TNT(parentElement.querySelector(`[data-id="${currentId}"]`), customSymbolTable);
            if (!__classPrivateFieldGet(this, _ForTagRenderer_TNTInstances, "f")[currentId]) {
                __classPrivateFieldGet(this, _ForTagRenderer_TNTInstances, "f")[currentId] = currentTNTInstance;
            }
            currentTNTInstance.render();
        });
    }
    render() {
        var _a;
        const forTags = [...__classPrivateFieldGet(this, _ForTagRenderer_root, "f").getElementsByTagName("t-for")];
        const render = (_a = __classPrivateFieldGet(this, _ForTagRenderer_customRenderer, "f")) !== null && _a !== void 0 ? _a : this.defaultRenderer;
        for (const currentTag of forTags) {
            let isCurrentChild = false;
            for (const parentTag of forTags) {
                if (getParentNodes(parentTag).includes(currentTag)) {
                    isCurrentChild = true;
                    break;
                }
            }
            if (isCurrentChild)
                continue;
            currentTag.setAttribute("data-rendering", "YES");
        }
        removeNodesWithParents(forTags, ["t-for"]).forEach((tag) => {
            const rendered = tag.getAttribute("data-rendered");
            if (rendered === null) {
                const error = __classPrivateFieldGet(this, _ForTagRenderer_instances, "m", _ForTagRenderer_validateElements).call(this, tag);
                if (error) {
                    tag.textContent = error;
                    return;
                }
                const tagId = generateId();
                tag.setAttribute("data-rendered", "YES");
                tag.setAttribute("data-id", tagId);
                __classPrivateFieldGet(this, _ForTagRenderer_tagChildren, "f")[tagId] = tag.children[0];
                tag.setAttribute("data-original", tag.getAttribute("data"));
                tag.removeAttribute("data");
                tag.removeAttribute("data-rendering");
                const { parentVariableValue, localVariableName } = __classPrivateFieldGet(this, _ForTagRenderer_instances, "m", _ForTagRenderer_parseOperation).call(this, tag);
                const renderedContent = render(parentVariableValue, localVariableName, __classPrivateFieldGet(this, _ForTagRenderer_tagChildren, "f")[tagId], tag);
                if (renderedContent)
                    tag.innerHTML = renderedContent;
                return;
            }
            tag.removeAttribute("data-rendering");
            const { parentVariableValue, localVariableName } = __classPrivateFieldGet(this, _ForTagRenderer_instances, "m", _ForTagRenderer_parseOperation).call(this, tag);
            const newlyRenderedContent = render(parentVariableValue, localVariableName, __classPrivateFieldGet(this, _ForTagRenderer_tagChildren, "f")[tag.getAttribute("data-id")], tag);
            if (newlyRenderedContent)
                tag.innerHTML = newlyRenderedContent;
        });
    }
}
_ForTagRenderer_customRenderer = new WeakMap(), _ForTagRenderer_root = new WeakMap(), _ForTagRenderer_symbolTable = new WeakMap(), _ForTagRenderer_tagChildren = new WeakMap(), _ForTagRenderer_TNTInstances = new WeakMap(), _ForTagRenderer_elementIds = new WeakMap(), _ForTagRenderer_instances = new WeakSet(), _ForTagRenderer_parseOperation = function _ForTagRenderer_parseOperation(tag) {
    const forOperation = tag.getAttribute("data-original").split(" in ", 2);
    const localVariableName = forOperation[0], parentVariableName = forOperation[1];
    const parentVariableValue = evaluate(__classPrivateFieldGet(this, _ForTagRenderer_symbolTable, "f"), parentVariableName);
    return { localVariableName, parentVariableValue };
}, _ForTagRenderer_validateElements = function _ForTagRenderer_validateElements(tag) {
    if (tag.children.length > 1) {
        return "[ERROR] <t-for /> elements can have at most 1 direct child element. Try wrapping your elements into a <div /> and try again.";
    }
    if (tag.children[0].tagName.toLowerCase() === "t-for") {
        return "[ERROR] <t-for /> elements' direct child cannot be <t-for />. Try wrapping it with a <div /> element and try again.";
    }
    return null;
};

export { ForTagRenderer as default };
//# sourceMappingURL=ForTagRenderer.js.map
