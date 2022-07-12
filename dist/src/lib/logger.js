import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';

var _Logger_name, _Logger_loggerStyle, _Logger_isDebug;
class DefaultLoggerStyle {
    constructor() {
        this.debug = "color: #059669;";
        this.info = "color: #3b82f6;";
        this.warn = "color: #ca8a04;";
        this.error = "color: #ff0000;";
    }
}
class Logger {
    constructor(name, loggerStyle) {
        _Logger_name.set(this, void 0);
        _Logger_loggerStyle.set(this, void 0);
        _Logger_isDebug.set(this, void 0);
        __classPrivateFieldSet(this, _Logger_name, name, "f");
        __classPrivateFieldSet(this, _Logger_loggerStyle, loggerStyle !== null && loggerStyle !== void 0 ? loggerStyle : new DefaultLoggerStyle(), "f");
        __classPrivateFieldSet(this, _Logger_isDebug, document.location.hostname === "127.0.0.1", "f");
    }
    info(message, debug = false) {
        if (debug && !__classPrivateFieldGet(this, _Logger_isDebug, "f"))
            return;
        console.log(`%c${debug ? "[DEBUG]" : ""}[${__classPrivateFieldGet(this, _Logger_name, "f")}] ${message}`, __classPrivateFieldGet(this, _Logger_loggerStyle, "f").info);
    }
    debug(message) {
        if (!__classPrivateFieldGet(this, _Logger_isDebug, "f"))
            return;
        console.log(`%c[${__classPrivateFieldGet(this, _Logger_name, "f")}] ${message}`, __classPrivateFieldGet(this, _Logger_loggerStyle, "f").debug);
    }
    warn(message, debug = false) {
        if (debug && !__classPrivateFieldGet(this, _Logger_isDebug, "f"))
            return;
        console.warn(`%c${debug ? "[DEBUG]" : ""}[${__classPrivateFieldGet(this, _Logger_name, "f")}] WARNING: ${message}`, __classPrivateFieldGet(this, _Logger_loggerStyle, "f").warn);
    }
    error(message, debug = false) {
        if (debug && !__classPrivateFieldGet(this, _Logger_isDebug, "f"))
            return;
        console.error(`%c${debug ? "[DEBUG]" : ""}[${__classPrivateFieldGet(this, _Logger_name, "f")}] ERROR: ${message}`, __classPrivateFieldGet(this, _Logger_loggerStyle, "f").error);
    }
}
_Logger_name = new WeakMap(), _Logger_loggerStyle = new WeakMap(), _Logger_isDebug = new WeakMap();

export { DefaultLoggerStyle, Logger };
//# sourceMappingURL=logger.js.map
