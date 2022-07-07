import { __classPrivateFieldGet } from '../../../node_modules/tslib/tslib.es6.js';
import { Logger } from '../../utils/logger.js';

var _DebugRenderTracer_logger;
class DebugRenderTracer {
    constructor() {
        _DebugRenderTracer_logger.set(this, new Logger("TNT Plugin Debugger"));
    }
    render() {
        __classPrivateFieldGet(this, _DebugRenderTracer_logger, "f").debug("Renderer called to perform a render.");
    }
}
_DebugRenderTracer_logger = new WeakMap();

export { DebugRenderTracer };
//# sourceMappingURL=DebugRenderTracer.js.map
