import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { evaluate } from '../runtime/GlobalEnvironment.js';

var _StyleDataRenderer_instances, _StyleDataRenderer_customRenderer, _StyleDataRenderer_root, _StyleDataRenderer_symbolTable, _StyleDataRenderer_setTagStyles;
const SEPARATOR = ";";
const CONNECTOR = "->";
class StyleDataRenderer {
    constructor(root, symbolTable, customRenderer) {
        _StyleDataRenderer_instances.add(this);
        _StyleDataRenderer_customRenderer.set(this, void 0);
        _StyleDataRenderer_root.set(this, void 0);
        _StyleDataRenderer_symbolTable.set(this, void 0);
        __classPrivateFieldSet(this, _StyleDataRenderer_root, root, "f");
        __classPrivateFieldSet(this, _StyleDataRenderer_symbolTable, symbolTable, "f");
        __classPrivateFieldSet(this, _StyleDataRenderer_customRenderer, customRenderer, "f");
        this.defaultRenderer = this.defaultRenderer.bind(this);
    }
    defaultRenderer(style) {
        const rendered = {};
        style.split(SEPARATOR).forEach((style) => {
            const stylePre = style.split(CONNECTOR);
            const [styleKey, styleValue] = [stylePre[0].trim(), stylePre[1].trim()];
            try {
                rendered[styleKey] = evaluate(__classPrivateFieldGet(this, _StyleDataRenderer_symbolTable, "f"), styleValue).toString();
            }
            catch (e) {
                rendered[styleKey] = `[ERROR] ${e}`;
            }
        });
        return rendered;
    }
    render() {
        var _a;
        const tagsToRender = __classPrivateFieldGet(this, _StyleDataRenderer_root, "f").querySelectorAll("[tnt-sd]");
        const render = (_a = __classPrivateFieldGet(this, _StyleDataRenderer_customRenderer, "f")) !== null && _a !== void 0 ? _a : this.defaultRenderer;
        tagsToRender.forEach((tag) => {
            const isRendered = tag.getAttribute("data-sd-rendered");
            if (!isRendered) {
                tag.setAttribute("data-sd-rendered", "YES");
                tag.setAttribute("data-sd", tag.getAttribute("tnt-sd"));
                tag.removeAttribute("tnt-sd");
                __classPrivateFieldGet(this, _StyleDataRenderer_instances, "m", _StyleDataRenderer_setTagStyles).call(this, tag, render(tag.getAttribute("data-sd")));
                return;
            }
            console.log(tag);
            const newlyRenderedContent = render(tag.getAttribute("data-sd"));
            __classPrivateFieldGet(this, _StyleDataRenderer_instances, "m", _StyleDataRenderer_setTagStyles).call(this, tag, newlyRenderedContent);
        });
    }
}
_StyleDataRenderer_customRenderer = new WeakMap(), _StyleDataRenderer_root = new WeakMap(), _StyleDataRenderer_symbolTable = new WeakMap(), _StyleDataRenderer_instances = new WeakSet(), _StyleDataRenderer_setTagStyles = function _StyleDataRenderer_setTagStyles(tag, styles) {
    let finalStyle = "";
    for (const styleKey in styles) {
        finalStyle += `${styleKey}: ${styles[styleKey]}`;
    }
    tag.setAttribute("style", finalStyle);
};

export { CONNECTOR, SEPARATOR, StyleDataRenderer as default };
//# sourceMappingURL=StyleDataRenderer.js.map
