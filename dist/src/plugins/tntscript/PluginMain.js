import { __classPrivateFieldGet } from '../../../node_modules/tslib/tslib.es6.js';
import { Globals } from '../../runtime/GlobalEnvironment.js';
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
        return [new TagRenderer()];
    }
    get tags() {
        return ["tnt"];
    }
    get version() {
        return "v1.0.0-integrated";
    }
    get dependencies() {
        return [];
    }
    onInit() {
        document.querySelectorAll("tnt").forEach((tntTag) => {
            __classPrivateFieldGet(this, _PluginMain_executor, "f").exec(tntTag.innerHTML);
        });
        Globals.valueEvaluator = ((e) => {
            return __classPrivateFieldGet(this, _PluginMain_executor, "f").evaluate(e);
        });
    }
}
_PluginMain_executor = new WeakMap();
Globals.plug(new PluginMain());

export { PluginMain };
//# sourceMappingURL=PluginMain.js.map
