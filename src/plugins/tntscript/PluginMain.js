var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PluginMain_executor;
import { Globals } from "runtime/GlobalEnvironment";
import { ScriptExecutor } from "./ScriptExecutor";
import { TagRenderer } from "./TagRenderer";
export class PluginMain {
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
//# sourceMappingURL=PluginMain.js.map