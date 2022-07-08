import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../../node_modules/tslib/tslib.es6.js';
import { setValueEvaluator } from '../../runtime/GlobalEnvironment.js';
import { ScriptExecutor } from './ScriptExecutor.js';
import { TagRenderer } from './TagRenderer.js';

var _TNTScriptPlugin_executor, _TNTScriptPlugin_symbolTable;
class TNTScriptPlugin {
    constructor(symbolTable) {
        _TNTScriptPlugin_executor.set(this, new ScriptExecutor());
        _TNTScriptPlugin_symbolTable.set(this, void 0);
        __classPrivateFieldSet(this, _TNTScriptPlugin_symbolTable, symbolTable, "f");
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
            __classPrivateFieldGet(this, _TNTScriptPlugin_executor, "f").exec(__classPrivateFieldGet(this, _TNTScriptPlugin_symbolTable, "f"), tntTag.getAttribute("data-original"));
        });
        setValueEvaluator((symbolTable, e) => {
            return __classPrivateFieldGet(this, _TNTScriptPlugin_executor, "f").evaluate(symbolTable, e);
        });
    }
}
_TNTScriptPlugin_executor = new WeakMap(), _TNTScriptPlugin_symbolTable = new WeakMap();

export { TNTScriptPlugin as default };
//# sourceMappingURL=index.js.map
