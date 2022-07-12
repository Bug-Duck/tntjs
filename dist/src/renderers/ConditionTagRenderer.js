import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { removeNodesWithParents, generateId } from '../lib/common.js';
import { evaluate, valueEvaluationFailedMessage } from '../runtime/GlobalEnvironment.js';
import { ignoreRender } from './index.js';

var _ConditionTagRenderer_instances, _ConditionTagRenderer_root, _ConditionTagRenderer_symbolTable, _ConditionTagRenderer_customRenderer, _ConditionTagRenderer_tagData, _ConditionTagRenderer_getConditionTagsByIfTag, _ConditionTagRenderer_renderTagContents;
class ConditionTagRenderer {
    constructor(root, symbolTable, customRenderer) {
        _ConditionTagRenderer_instances.add(this);
        _ConditionTagRenderer_root.set(this, void 0);
        _ConditionTagRenderer_symbolTable.set(this, void 0);
        _ConditionTagRenderer_customRenderer.set(this, void 0);
        _ConditionTagRenderer_tagData.set(this, void 0);
        __classPrivateFieldSet(this, _ConditionTagRenderer_root, root, "f");
        __classPrivateFieldSet(this, _ConditionTagRenderer_symbolTable, symbolTable, "f");
        __classPrivateFieldSet(this, _ConditionTagRenderer_customRenderer, customRenderer, "f");
        __classPrivateFieldSet(this, _ConditionTagRenderer_tagData, {}, "f");
        this.defaultRenderer = this.defaultRenderer.bind(this);
    }
    defaultRenderer(parentElement, conditionTag) {
        if (!conditionTag) {
            return;
        }
        const ifTagValue = evaluate(__classPrivateFieldGet(this, _ConditionTagRenderer_symbolTable, "f"), conditionTag.ifTag.condition);
        if (ifTagValue && !ifTagValue.toString().startsWith(valueEvaluationFailedMessage)) {
            __classPrivateFieldGet(this, _ConditionTagRenderer_instances, "m", _ConditionTagRenderer_renderTagContents).call(this, parentElement, conditionTag.ifTag.children);
            return;
        }
        for (const elifTag of conditionTag.elifTags) {
            const elifTagValue = evaluate(__classPrivateFieldGet(this, _ConditionTagRenderer_symbolTable, "f"), elifTag.condition);
            if (elifTagValue && !elifTagValue.toString().startsWith(valueEvaluationFailedMessage)) {
                __classPrivateFieldGet(this, _ConditionTagRenderer_instances, "m", _ConditionTagRenderer_renderTagContents).call(this, parentElement, elifTag.children);
                return;
            }
        }
        if (conditionTag.elseTag) {
            __classPrivateFieldGet(this, _ConditionTagRenderer_instances, "m", _ConditionTagRenderer_renderTagContents).call(this, parentElement, conditionTag.elseTag.children);
            return;
        }
    }
    render() {
        var _a;
        const ifTags = [...__classPrivateFieldGet(this, _ConditionTagRenderer_root, "f").getElementsByTagName("t-if")];
        const render = (_a = __classPrivateFieldGet(this, _ConditionTagRenderer_customRenderer, "f")) !== null && _a !== void 0 ? _a : this.defaultRenderer;
        removeNodesWithParents(ifTags, ignoreRender).slice().forEach((ifTag) => {
            var _a;
            const isRendered = ifTag.getAttribute("data-rendered");
            if (isRendered) {
                const tagId = ifTag.getAttribute("data-id");
                render(ifTag, __classPrivateFieldGet(this, _ConditionTagRenderer_tagData, "f")[tagId]);
                return;
            }
            ifTag.setAttribute("data-rendered", "YES");
            ifTag.setAttribute("data-original", ifTag.getAttribute("cond"));
            const ifTagData = {
                type: "if",
                condition: ifTag.getAttribute("data-original"),
                children: [...ifTag.children],
                show: false,
            };
            ifTag.innerHTML = "";
            const { elifTags: elifTagElements, elseTag: elseTagElement } = __classPrivateFieldGet(this, _ConditionTagRenderer_instances, "m", _ConditionTagRenderer_getConditionTagsByIfTag).call(this, ifTag);
            const elseTag = elseTagElement ? {
                type: "else",
                condition: "true",
                children: [...elseTagElement.children],
                show: false
            } : null;
            const elifTags = [];
            elseTagElement === null || elseTagElement === void 0 ? void 0 : elseTagElement.remove();
            elifTagElements.forEach((element) => {
                elifTags.push({
                    type: "elif",
                    condition: element.getAttribute("cond"),
                    children: [...element.children],
                    show: false,
                });
                element.remove();
            });
            const tagId = (_a = generateId()) !== null && _a !== void 0 ? _a : ifTag.getAttribute("data-id");
            if (!ifTag.getAttribute("data-id"))
                ifTag.setAttribute("data-id", tagId);
            const tagData = {
                ifTag: ifTagData,
                elifTags,
                elseTag,
            };
            __classPrivateFieldGet(this, _ConditionTagRenderer_tagData, "f")[tagId] = tagData;
            render(ifTag, __classPrivateFieldGet(this, _ConditionTagRenderer_tagData, "f")[tagId]);
        });
    }
}
_ConditionTagRenderer_root = new WeakMap(), _ConditionTagRenderer_symbolTable = new WeakMap(), _ConditionTagRenderer_customRenderer = new WeakMap(), _ConditionTagRenderer_tagData = new WeakMap(), _ConditionTagRenderer_instances = new WeakSet(), _ConditionTagRenderer_getConditionTagsByIfTag = function _ConditionTagRenderer_getConditionTagsByIfTag(ifTag) {
    const allowedTagNames = ["t-else", "t-elif"];
    let nextSibling = ifTag.nextElementSibling;
    let elseTag = null;
    const elifTags = [];
    while (nextSibling &&
        allowedTagNames.includes(nextSibling.nodeName.toLowerCase())) {
        if (nextSibling.nodeName.toLowerCase() === "t-else") {
            elseTag = nextSibling;
            break;
        }
        if (nextSibling.nodeName.toLowerCase() === "t-elif") {
            elifTags.push(nextSibling);
            nextSibling = nextSibling.nextElementSibling;
        }
    }
    return {
        elseTag,
        elifTags,
    };
}, _ConditionTagRenderer_renderTagContents = function _ConditionTagRenderer_renderTagContents(parentElement, children) {
    children.forEach((child) => {
        parentElement.appendChild(child);
    });
};

export { ConditionTagRenderer as default };
//# sourceMappingURL=ConditionTagRenderer.js.map
