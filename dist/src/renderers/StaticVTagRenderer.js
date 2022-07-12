import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { evaluate } from '../runtime/GlobalEnvironment.js';

var _StaticVTagRenderer_instances, _StaticVTagRenderer_customRenderer, _StaticVTagRenderer_renderer, _StaticVTagRenderer_root, _StaticVTagRenderer_symbolTable, _StaticVTagRenderer_defaultRenderer;
class StaticVTagRenderer {
    constructor(root, symbolTable, customRenderer = undefined) {
        var _a;
        _StaticVTagRenderer_instances.add(this);
        _StaticVTagRenderer_customRenderer.set(this, void 0);
        _StaticVTagRenderer_renderer.set(this, void 0);
        _StaticVTagRenderer_root.set(this, void 0);
        _StaticVTagRenderer_symbolTable.set(this, void 0);
        __classPrivateFieldSet(this, _StaticVTagRenderer_customRenderer, customRenderer, "f");
        __classPrivateFieldSet(this, _StaticVTagRenderer_renderer, (_a = __classPrivateFieldGet(this, _StaticVTagRenderer_customRenderer, "f")) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _StaticVTagRenderer_instances, "m", _StaticVTagRenderer_defaultRenderer), "f");
        __classPrivateFieldSet(this, _StaticVTagRenderer_root, root, "f");
        __classPrivateFieldSet(this, _StaticVTagRenderer_symbolTable, symbolTable, "f");
    }
    render() {
        const svTags = [...__classPrivateFieldGet(this, _StaticVTagRenderer_root, "f").getElementsByTagName("sv")];
        svTags.forEach((tag) => {
            tag.innerHTML = __classPrivateFieldGet(this, _StaticVTagRenderer_renderer, "f").call(this, tag.getAttribute("data-original"));
        });
    }
}
_StaticVTagRenderer_customRenderer = new WeakMap(), _StaticVTagRenderer_renderer = new WeakMap(), _StaticVTagRenderer_root = new WeakMap(), _StaticVTagRenderer_symbolTable = new WeakMap(), _StaticVTagRenderer_instances = new WeakSet(), _StaticVTagRenderer_defaultRenderer = function _StaticVTagRenderer_defaultRenderer(s) {
    try {
        return `${evaluate(__classPrivateFieldGet(this, _StaticVTagRenderer_symbolTable, "f"), s)}`;
    }
    catch (e) {
        return `Error while rendering element: ${e}`;
    }
};

export { StaticVTagRenderer as default };
//# sourceMappingURL=StaticVTagRenderer.js.map
