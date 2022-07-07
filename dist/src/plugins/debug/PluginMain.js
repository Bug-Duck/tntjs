import { __classPrivateFieldGet } from '../../../node_modules/tslib/tslib.es6.js';
import { Globals } from '../../runtime/GlobalEnvironment.js';
import { DebugRenderTracer } from './DebugRenderTracer.js';
import { Logger } from '../../utils/logger.js';

var _PluginMain_logger;
class PluginMain {
    constructor() {
        _PluginMain_logger.set(this, new Logger("TNT Plugin Debugger"));
    }
    get id() {
        return "tntdebug";
    }
    get rendererList() {
        return [new DebugRenderTracer()];
    }
    get tags() {
        return [];
    }
    get version() {
        return "1.0.0-integrated";
    }
    get dependencies() {
        return [];
    }
    onInit() {
        __classPrivateFieldGet(this, _PluginMain_logger, "f").debug("[Debugger] Debug mode enabled. ");
    }
}
_PluginMain_logger = new WeakMap();
Globals.plug(new PluginMain());

export { PluginMain };
//# sourceMappingURL=PluginMain.js.map
