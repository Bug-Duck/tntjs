import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { Globals } from './GlobalEnvironment.js';

var _VTagRenderer_customRenderer;
class VTagRenderer {
    constructor(customRenderer = undefined) {
        _VTagRenderer_customRenderer.set(this, void 0);
        __classPrivateFieldSet(this, _VTagRenderer_customRenderer, customRenderer, "f");
    }
    defaultRenderer(s) {
        try {
            return `${Globals.evaluate(s)}`;
        }
        catch (e) {
            return `Error while rendering element: ${e}`;
        }
    }
    render() {
        var _a;
        const vTags = document.querySelectorAll("v");
        const renderer = (_a = __classPrivateFieldGet(this, _VTagRenderer_customRenderer, "f")) !== null && _a !== void 0 ? _a : this.defaultRenderer;
        vTags.forEach((tag) => {
            const rendered = tag.getAttribute("data-rendered");
            if (rendered === null) {
                tag.setAttribute("data-rendered", "YES");
                tag.setAttribute("data-original", tag.innerHTML);
                tag.innerHTML = renderer(tag.innerHTML);
                return;
            }
            const content = tag.getAttribute("data-original");
            const newlyRenderedContent = renderer(content);
            tag.innerHTML = tag.innerHTML !== newlyRenderedContent ?
                newlyRenderedContent :
                tag.innerHTML;
        });
    }
}
_VTagRenderer_customRenderer = new WeakMap();

export { VTagRenderer as default };
//# sourceMappingURL=VTagRenderer.js.map
