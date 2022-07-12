import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { removeNodesWithParents } from '../lib/common.js';
import { evaluate } from '../runtime/GlobalEnvironment.js';
import { ignoreRender } from './index.js';

var _VTagRenderer_customRenderer, _VTagRenderer_root, _VTagRenderer_symbolTable;
class VTagRenderer {
    constructor(root, symbolTable, customRenderer) {
        _VTagRenderer_customRenderer.set(this, void 0);
        _VTagRenderer_root.set(this, void 0);
        _VTagRenderer_symbolTable.set(this, void 0);
        __classPrivateFieldSet(this, _VTagRenderer_customRenderer, customRenderer, "f");
        __classPrivateFieldSet(this, _VTagRenderer_root, root, "f");
        __classPrivateFieldSet(this, _VTagRenderer_symbolTable, symbolTable, "f");
        this.defaultRenderer = this.defaultRenderer.bind(this);
    }
    defaultRenderer(s) {
        try {
            return `${evaluate(__classPrivateFieldGet(this, _VTagRenderer_symbolTable, "f"), s)}`;
        }
        catch (e) {
            return `Error while rendering element: ${e}`;
        }
    }
    render() {
        var _a;
        const vTags = [...__classPrivateFieldGet(this, _VTagRenderer_root, "f").getElementsByTagName("v")];
        const renderer = (_a = __classPrivateFieldGet(this, _VTagRenderer_customRenderer, "f")) !== null && _a !== void 0 ? _a : this.defaultRenderer;
        removeNodesWithParents(vTags, ignoreRender).forEach((tag) => {
            const rendered = tag.getAttribute("data-rendered");
            if (rendered === null) {
                tag.setAttribute("data-rendered", "YES");
                tag.setAttribute("data-original", tag.getAttribute("data"));
                tag.removeAttribute("data");
                tag.innerHTML = renderer(tag.getAttribute("data-original"));
                return;
            }
            const content = tag.getAttribute("data-original");
            const newlyRenderedContent = renderer(content);
            tag.innerHTML = newlyRenderedContent;
        });
    }
}
_VTagRenderer_customRenderer = new WeakMap(), _VTagRenderer_root = new WeakMap(), _VTagRenderer_symbolTable = new WeakMap();

export { VTagRenderer as default };
//# sourceMappingURL=VTagRenderer.js.map
