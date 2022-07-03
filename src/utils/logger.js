var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Logger_instances, _Logger_name, _Logger_loggerStyle, _Logger_isDebug_get;
export class DefaultLoggerStyle {
    constructor() {
        this.debug = "color: #059669;";
        this.info = "color: #3b82f6;";
        this.warn = "color: #ca8a04;";
        this.error = "color: #ff0000;";
    }
}
export class Logger {
    constructor(name, loggerStyle) {
        _Logger_instances.add(this);
        _Logger_name.set(this, void 0);
        _Logger_loggerStyle.set(this, void 0);
        __classPrivateFieldSet(this, _Logger_name, name, "f");
        __classPrivateFieldSet(this, _Logger_loggerStyle, loggerStyle !== null && loggerStyle !== void 0 ? loggerStyle : new DefaultLoggerStyle(), "f");
    }
    info(message, debug = false) {
        if (debug && !__classPrivateFieldGet(this, _Logger_instances, "a", _Logger_isDebug_get))
            return;
        console.log(`%c${debug ? "[DEBUG]" : ""}[${__classPrivateFieldGet(this, _Logger_name, "f")}] ${message}`, __classPrivateFieldGet(this, _Logger_loggerStyle, "f").info);
    }
    debug(message) {
        if (!__classPrivateFieldGet(this, _Logger_instances, "a", _Logger_isDebug_get))
            return;
        console.log(`%c[${__classPrivateFieldGet(this, _Logger_name, "f")}] ${message}`, __classPrivateFieldGet(this, _Logger_loggerStyle, "f").debug);
    }
    warn(message, debug = false) {
        if (debug && !__classPrivateFieldGet(this, _Logger_instances, "a", _Logger_isDebug_get))
            return;
        console.warn(`%c${debug ? "[DEBUG]" : ""}[${__classPrivateFieldGet(this, _Logger_name, "f")}] WARNING: ${message}`, __classPrivateFieldGet(this, _Logger_loggerStyle, "f").warn);
    }
    error(message, debug = false) {
        if (debug && !__classPrivateFieldGet(this, _Logger_instances, "a", _Logger_isDebug_get))
            return;
        console.error(`%c${debug ? "[DEBUG]" : ""}[${__classPrivateFieldGet(this, _Logger_name, "f")}] ERROR: ${message}`, __classPrivateFieldGet(this, _Logger_loggerStyle, "f").error);
    }
}
_Logger_name = new WeakMap(), _Logger_loggerStyle = new WeakMap(), _Logger_instances = new WeakSet(), _Logger_isDebug_get = function _Logger_isDebug_get() {
    return document.getElementsByTagName("tnt-debug").length > 0;
};
//# sourceMappingURL=logger.js.map