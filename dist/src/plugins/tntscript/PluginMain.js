import { __classPrivateFieldGet } from '../../../node_modules/tslib/tslib.es6.js';
import { setValueEvaluator } from '../../runtime/GlobalEnvironment.js';
import { ScriptExecutor } from './ScriptExecutor.js';
import { TagRenderer } from './TagRenderer.js';

var _PluginMain_executor;
class PluginMain {
    constructor() {
        _PluginMain_executor.set(this, new ScriptExecutor());
    }
    get id() {
        return "tntscript";
    }
    get rendererList() {
        return [new TagRenderer(this.root)];
    }
    get tags() {
        return ["tnt"];
    }
    get version() {
        return "v0.0.1-integrated";
    }
    get dependencies() {
        return [];
    }
    onInit() {
        this.root.querySelectorAll("tnt").forEach((tntTag) => {
            __classPrivateFieldGet(this, _PluginMain_executor, "f").exec(tntTag.innerHTML);
        });
        setValueEvaluator((e) => {
            return __classPrivateFieldGet(this, _PluginMain_executor, "f").evaluate(e);
        });
    }
}
_PluginMain_executor = new WeakMap();

export { PluginMain };
//# sourceMappingURL=PluginMain.js.map
