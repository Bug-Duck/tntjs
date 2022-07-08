import { __classPrivateFieldGet } from '../../../node_modules/tslib/tslib.es6.js';
import { DebugRenderTracer } from './DebugRenderTracer.js';
import { Logger } from '../../lib/logger.js';

var _DebugPlugin_logger;
class DebugPlugin {
    constructor() {
        _DebugPlugin_logger.set(this, new Logger("TNT Debugger"));
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
        __classPrivateFieldGet(this, _DebugPlugin_logger, "f").debug("[Debugger] Debug mode enabled. ");
    }
}
_DebugPlugin_logger = new WeakMap();

export { DebugPlugin as default };
//# sourceMappingURL=index.js.map
