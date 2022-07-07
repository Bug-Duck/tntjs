import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';
import { Globals } from './GlobalEnvironment.js';

var _StaticVTagRenderer_instances, _StaticVTagRenderer_customRenderer, _StaticVTagRenderer_renderer, _StaticVTagRenderer_defaultRenderer;
class StaticVTagRenderer {
    constructor(customRenderer = undefined) {
        var _a;
        _StaticVTagRenderer_instances.add(this);
        _StaticVTagRenderer_customRenderer.set(this, void 0);
        _StaticVTagRenderer_renderer.set(this, void 0);
        __classPrivateFieldSet(this, _StaticVTagRenderer_customRenderer, customRenderer, "f");
        __classPrivateFieldSet(this, _StaticVTagRenderer_renderer, (_a = __classPrivateFieldGet(this, _StaticVTagRenderer_customRenderer, "f")) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _StaticVTagRenderer_instances, "m", _StaticVTagRenderer_defaultRenderer), "f");
    }
    render() {
        const svTags = document.querySelectorAll("sv");
        svTags.forEach((tag) => {
            tag.innerHTML = __classPrivateFieldGet(this, _StaticVTagRenderer_renderer, "f").call(this, tag.innerHTML);
        });
    }
}
_StaticVTagRenderer_customRenderer = new WeakMap(), _StaticVTagRenderer_renderer = new WeakMap(), _StaticVTagRenderer_instances = new WeakSet(), _StaticVTagRenderer_defaultRenderer = function _StaticVTagRenderer_defaultRenderer(s) {
    try {
        return `${Globals.evaluate(s)}`;
    }
    catch (e) {
        return `Error while rendering element: ${e}`;
    }
};

export { StaticVTagRenderer as default };
//# sourceMappingURL=StaticVTagRenderer.js.map
