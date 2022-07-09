import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { evaluate } from './GlobalEnvironment.js';

var _TagDataRenderer_instances, _TagDataRenderer_customRenderer, _TagDataRenderer_root, _TagDataRenderer_symbolTable, _TagDataRenderer_setTagAttributes;
const SEPARATOR = ";";
const CONNECTOR = "->";
class TagDataRenderer {
    constructor(root, symbolTable, customRenderer) {
        _TagDataRenderer_instances.add(this);
        _TagDataRenderer_customRenderer.set(this, void 0);
        _TagDataRenderer_root.set(this, void 0);
        _TagDataRenderer_symbolTable.set(this, void 0);
        __classPrivateFieldSet(this, _TagDataRenderer_root, root, "f");
        __classPrivateFieldSet(this, _TagDataRenderer_symbolTable, symbolTable, "f");
        __classPrivateFieldSet(this, _TagDataRenderer_customRenderer, customRenderer, "f");
        this.defaultRenderer = this.defaultRenderer.bind(this);
    }
    defaultRenderer(tagContent) {
        const rendered = {};
        tagContent.split(SEPARATOR).forEach((tag) => {
            const tagPre = tag.split(CONNECTOR);
            const [tagName, tagContent] = [tagPre[0].trim(), tagPre[1].trim()];
            try {
                rendered[tagName] = evaluate(__classPrivateFieldGet(this, _TagDataRenderer_symbolTable, "f"), tagContent).toString();
            }
            catch (e) {
                rendered[tagName] = `[ERROR] ${e}`;
            }
        });
        return rendered;
    }
    render() {
        var _a;
        const tagsToRender = __classPrivateFieldGet(this, _TagDataRenderer_root, "f").querySelectorAll("[tnt-td]");
        const render = (_a = __classPrivateFieldGet(this, _TagDataRenderer_customRenderer, "f")) !== null && _a !== void 0 ? _a : this.defaultRenderer;
        tagsToRender.forEach((tag) => {
            const isRendered = tag.getAttribute("data-rendered");
            if (!isRendered) {
                tag.setAttribute("data-rendered", "YES");
                tag.setAttribute("data-td", tag.getAttribute("tnt-td"));
                tag.removeAttribute("tnt-td");
                __classPrivateFieldGet(this, _TagDataRenderer_instances, "m", _TagDataRenderer_setTagAttributes).call(this, tag, render(tag.getAttribute("data-td")));
                return;
            }
            const newlyRenderedContent = render(tag.getAttribute("data-td"));
            __classPrivateFieldGet(this, _TagDataRenderer_instances, "m", _TagDataRenderer_setTagAttributes).call(this, tag, newlyRenderedContent);
        });
    }
}
_TagDataRenderer_customRenderer = new WeakMap(), _TagDataRenderer_root = new WeakMap(), _TagDataRenderer_symbolTable = new WeakMap(), _TagDataRenderer_instances = new WeakSet(), _TagDataRenderer_setTagAttributes = function _TagDataRenderer_setTagAttributes(tag, attributes) {
    for (const attributeName in attributes) {
        tag.setAttribute(attributeName, attributes[attributeName]);
    }
};

export { CONNECTOR, SEPARATOR, TagDataRenderer as default };
//# sourceMappingURL=TagDataRenderer.js.map
