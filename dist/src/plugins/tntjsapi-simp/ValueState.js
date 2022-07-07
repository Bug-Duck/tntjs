import { __classPrivateFieldGet } from '../../../node_modules/tslib/tslib.es6.js';
import { Globals } from '../../runtime/GlobalEnvironment.js';
import { Variable } from '../../runtime/SymbolTable.js';
import { Logger } from '../../utils/logger.js';

var _Value_logger;
class PluginMain {
    get id() {
        return "tntjsapi-simp";
    }
    get rendererList() {
        return [];
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
    onInit() { }
}
class Value {
    constructor(name, type) {
        _Value_logger.set(this, new Logger("tntjsapi-simp"));
        this.name = name;
        this.valueObject = new Variable(type.defaultValue, type);
    }
    setValue(value) {
        __classPrivateFieldGet(this, _Value_logger, "f").debug(`Setting value ${value} for variable ${this.name}...`);
        this.valueObject.value = value;
        Globals.symbolTable.setValue(this.name, this.valueObject);
        __classPrivateFieldGet(this, _Value_logger, "f").debug(`Set value ${value} for variable ${this.name}.`);
        return this;
    }
    Delete() {
        __classPrivateFieldGet(this, _Value_logger, "f").debug(`Deletting variable ${this.name}...`);
        Globals.symbolTable.del(this.name);
        __classPrivateFieldGet(this, _Value_logger, "f").debug(`Delete variable ${this.name}.`);
    }
    get value() {
        return this.valueObject.value;
    }
    get type() {
        return this.valueObject.type;
    }
}
_Value_logger = new WeakMap();
Globals.plug(new PluginMain());

export { PluginMain, Value };
//# sourceMappingURL=ValueState.js.map
