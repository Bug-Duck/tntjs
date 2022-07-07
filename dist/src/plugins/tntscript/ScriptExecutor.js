import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../../node_modules/tslib/tslib.es6.js';
import { SymbolTable, StringType } from '../../runtime/SymbolTable.js';
import { Globals } from '../../runtime/GlobalEnvironment.js';
import { functionSplit, jsTypeToTNTType, codeSplit } from './LexicalAnalysis.js';
import { runScriptCode } from './ScriptRun.js';

var _ScriptExecutor_innerSymbolTable;
class ScriptExecutor {
    constructor() {
        _ScriptExecutor_innerSymbolTable.set(this, void 0);
    }
    exec(scriptContent, data = new SymbolTable()) {
        __classPrivateFieldSet(this, _ScriptExecutor_innerSymbolTable, data, "f");
        runScriptCode(scriptContent, this);
    }
    getFunctionParameter(reg, expression = /\(.+\)/) {
        const functionParametersMatch = reg.match(expression)[0];
        const parameter = functionParametersMatch.substring(1, functionParametersMatch.length - 1);
        return functionSplit(parameter);
    }
    onFunction(reg) {
        var _a, _b;
        const name = /[^(.+)]+/.exec(reg)[0].replace(/\s*/g, "");
        if (((_a = Globals.symbolTable.getValue(name)) === null || _a === void 0 ? void 0 : _a.value) === "function") {
            let buffer = "";
            const parameters = this.getFunctionParameter(reg);
            parameters.args.forEach((arg) => {
                buffer = buffer + arg;
                buffer = buffer + ",";
            });
            Object.values(parameters.optionalArgs).forEach((arg) => {
                buffer = buffer + arg + "=,";
            });
            const results = Function(`TNT.TNTSymbolTable.${name}.value(${buffer})`)();
            return {
                type: jsTypeToTNTType(typeof results),
                value: results,
            };
        }
        if (((_b = Globals.symbolTable.getValue(name)) === null || _b === void 0 ? void 0 : _b.value) === "tnt") {
            return {
                type: "tnt",
                value: "",
            };
        }
    }
    processValue(reg) {
        var _a;
        const isString = /("|').+("|')/;
        const isNumber = /[0-9]+/;
        const isBool = /(true|false)/;
        const isVar = /[_A-z0-9]/;
        const isMathGex = /(.+ ?(\+|-|\*|\/)+ ?.+)+/;
        const isXML = /<.+>/;
        const isCodeBlock = /\{.+\}/;
        const isFunction = /.+\(.+\)/;
        if (isFunction.test(reg)) {
            this.onFunction(reg);
        }
        if (isCodeBlock.test(reg)) {
            return {
                type: "code",
                value: codeSplit(reg.substring(1, reg.length - 1)),
            };
        }
        if (isNumber.test(reg)) {
            return {
                type: "number",
                value: Number(reg)
            };
        }
        if (isString.test(reg)) {
            return {
                type: "string",
                value: reg,
            };
        }
        if (isBool.test(reg)) {
            return {
                type: "bool",
                value: Boolean(reg),
            };
        }
        if (isVar.test(reg)) {
            const results = (_a = Globals.symbolTable.getValue(reg)) === null || _a === void 0 ? void 0 : _a.value;
            const result = {
                type: jsTypeToTNTType(typeof (results)),
                value: results,
            };
            return result;
        }
        if (isMathGex.test(reg)) {
            return {
                type: "math",
                value: "",
            };
        }
        if (isXML.test(reg)) {
            return {
                type: "XML",
                value: reg,
            };
        }
        return {
            type: "unknown",
            value: reg,
        };
    }
    renderDOM(HTML, DOM) {
        DOM.innerHTML = HTML;
    }
    evaluate(expression) {
        const value = Globals.symbolTable.getValue(expression.trim());
        if (value.type === StringType && typeof value.value === "string") {
            return value.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        return value.value;
    }
    get innerSymbolTable() {
        return __classPrivateFieldGet(this, _ScriptExecutor_innerSymbolTable, "f");
    }
}
_ScriptExecutor_innerSymbolTable = new WeakMap();

export { ScriptExecutor };
//# sourceMappingURL=ScriptExecutor.js.map
