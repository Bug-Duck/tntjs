import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { evaluate } from './GlobalEnvironment.js';

var _AttributeDataRenderer_instances, _AttributeDataRenderer_customRenderer, _AttributeDataRenderer_root, _AttributeDataRenderer_symbolTable, _AttributeDataRenderer_setTagAttributes;
const SEPARATOR = ";";
const CONNECTOR = "->";
class AttributeDataRenderer {
    constructor(root, symbolTable, customRenderer) {
        _AttributeDataRenderer_instances.add(this);
        _AttributeDataRenderer_customRenderer.set(this, void 0);
        _AttributeDataRenderer_root.set(this, void 0);
        _AttributeDataRenderer_symbolTable.set(this, void 0);
        __classPrivateFieldSet(this, _AttributeDataRenderer_root, root, "f");
        __classPrivateFieldSet(this, _AttributeDataRenderer_symbolTable, symbolTable, "f");
        __classPrivateFieldSet(this, _AttributeDataRenderer_customRenderer, customRenderer, "f");
        this.defaultRenderer = this.defaultRenderer.bind(this);
    }
    defaultRenderer(tagContent) {
        const rendered = {};
        tagContent.split(SEPARATOR).forEach((tag) => {
            const tagPre = tag.split(CONNECTOR);
            const [tagName, tagContent] = [tagPre[0].trim(), tagPre[1].trim()];
            try {
                rendered[tagName] = evaluate(__classPrivateFieldGet(this, _AttributeDataRenderer_symbolTable, "f"), tagContent).toString();
            }
            catch (e) {
                rendered[tagName] = `[ERROR] ${e}`;
            }
        });
        return rendered;
    }
    render() {
        var _a;
        const tagsToRender = __classPrivateFieldGet(this, _AttributeDataRenderer_root, "f").querySelectorAll("[tnt-td]");
        const render = (_a = __classPrivateFieldGet(this, _AttributeDataRenderer_customRenderer, "f")) !== null && _a !== void 0 ? _a : this.defaultRenderer;
        tagsToRender.forEach((tag) => {
            const isRendered = tag.getAttribute("data-td-rendered");
            if (!isRendered) {
                tag.setAttribute("data-td-rendered", "YES");
                tag.setAttribute("data-td", tag.getAttribute("tnt-td"));
                tag.removeAttribute("tnt-td");
                __classPrivateFieldGet(this, _AttributeDataRenderer_instances, "m", _AttributeDataRenderer_setTagAttributes).call(this, tag, render(tag.getAttribute("data-td")));
                return;
            }
            const newlyRenderedContent = render(tag.getAttribute("data-td"));
            __classPrivateFieldGet(this, _AttributeDataRenderer_instances, "m", _AttributeDataRenderer_setTagAttributes).call(this, tag, newlyRenderedContent);
        });
    }
}
_AttributeDataRenderer_customRenderer = new WeakMap(), _AttributeDataRenderer_root = new WeakMap(), _AttributeDataRenderer_symbolTable = new WeakMap(), _AttributeDataRenderer_instances = new WeakSet(), _AttributeDataRenderer_setTagAttributes = function _AttributeDataRenderer_setTagAttributes(tag, attributes) {
    for (const attributeName in attributes) {
        tag.setAttribute(attributeName, attributes[attributeName]);
    }
};

export { CONNECTOR, SEPARATOR, AttributeDataRenderer as default };
//# sourceMappingURL=AttributeDataRenderer.js.map
