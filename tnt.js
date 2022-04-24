var TNT;
(function (TNT) {
    function setVtagContent(vTag, newValue) {
        if (vTag.tagName !== "V" || typeof (newValue) !== "string") {
            throw new Error("vTag should be a V html element.");
        }
        if (vTag.getAttribute("data-rendered") === null) {
            vTag.innerHTML = newValue;
        }
        else {
            vTag.setAttribute("data-v-content", newValue);
        }
        TNT.TNTValueTagProcessing();
    }
    TNT.setVtagContent = setVtagContent;
})(TNT || (TNT = {}));
var TNT;
(function (TNT) {
    TNT.TNTSymbolTable = {
        PI: {
            type: 'number',
            value: 3.14159265,
        },
        test: {
            type: 'number',
            value: 2333
        },
        print: {
            type: 'function',
            value: function (x) {
                console.log(x);
            },
        },
        tojs: {
            type: 'function',
            value: function (x) {
                eval(x);
            }
        },
    };
    function JsTypeToTNTType(TypeName) {
        switch (TypeName) {
            case "String":
                return 'string';
                break;
            case "Number":
                return 'number';
                break;
            case "Boolean":
                return 'bool';
                break;
            default:
                break;
        }
    }
    TNT.JsTypeToTNTType = JsTypeToTNTType;
    function newData(type, name, value, datahouse) {
        datahouse[name] = {
            type: type,
            value: value,
        };
    }
    TNT.newData = newData;
})(TNT || (TNT = {}));
window.onload = () => {
    TNT.TNTSymbolTable["explorerType"] = {
        type: 'string',
        value: TNT.TNTGetBrowserType(),
    };
    TNT.TNTTagProcessing();
    TNT.TNTValueTagProcessing();
    setTimeout(() => {
        TNT.TNTSymbolTable["test"].value = 114514;
        TNT.TNTValueTagProcessing();
    }, 1000);
};
var TNT;
(function (TNT) {
    function TNTMatchStartSymbol(startSymbol, endSymbol, data, startIndex) {
        const stack = [];
        stack.push(1);
        for (let i = startIndex + 1; i < data.length; i++) {
            if (data[i] === startSymbol) {
                stack.push(1);
            }
            if (data[i] === endSymbol) {
                stack.pop();
                if (stack.length === 0) {
                    return i;
                }
            }
        }
        return -1;
    }
    function TNTValueProcess(reg) {
        const isString = /(\"|\').+(\"|\')/;
        const isNumber = /[0-9]+/;
        const isBool = /(true|false)/;
        const isVar = /[_A-z0-9]/;
        const isMathGex = /(.+ ?(\+|-|\*|\/)+ ?.+)+/;
        const isXML = /<.+>/;
        const iscodes = /\{.+\}/;
        if (/.+\(.+\)/.test(reg)) {
            const name = /[^\(.+\)]+/.exec(reg)[0].replace(/\s*/g, "");
            if (TNT.TNTSymbolTable[name].type === 'function') {
                let buffer = "";
                let __parameters__ = /\(.+\)/.exec(reg);
                let __parameter__ = __parameters__[0];
                __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
                const parameters = TNTFunctionSplit(__parameter__);
                for (const i of parameters['agv']) {
                    buffer = buffer + i;
                    buffer = buffer + ',';
                }
                for (const i in parameters['functioncanvalue']) {
                    buffer = buffer + i + '=' + ',';
                }
                const results = eval(`TNTSymbolTable.${name}.value(${buffer})`);
                const result = {
                    type: TNT.JsTypeToTNTType(typeof (results)),
                    value: results,
                };
                return result;
            }
            else if (TNT.TNTSymbolTable[name].type === 'tnt') {
                let __parameters__ = /\(.+\)/.exec(reg);
                let __parameter__ = __parameters__[0];
                __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
                const parameters = TNTFunctionSplit(__parameter__);
                let par = {};
                TNT.TNTSymbolTable[name].parameter.forEach((ele, i) => {
                    par[ele] = parameters.agv[i];
                });
                for (const key in TNT.TNTSymbolTable[name].canparameter) {
                    par[key] = TNT.TNTSymbolTable[name].canparameter[key];
                }
                for (const key in TNT.TNTSymbolTable[name].canparameter) {
                    par[key] = parameters.functioncanvalue[key];
                }
                TNTBoom(TNT.TNTSymbolTable[name].code, par);
            }
        }
        else if (iscodes.test(reg)) {
            return {
                type: 'code',
                value: TNTCodeSplit(reg.substring(1, reg.length - 1)),
            };
        }
        else if (isNumber.test(reg)) {
            return {
                type: 'number',
                value: Number(reg)
            };
        }
        else if (isString.test(reg)) {
        }
        else if (isBool.test(reg)) {
            return {
                type: 'bool',
                value: Boolean(reg),
            };
        }
        else if (isVar.test(reg)) {
            const results = TNT.TNTSymbolTable[reg].value;
            const result = {
                type: TNT.JsTypeToTNTType(typeof (results)),
                value: results,
            };
            return result;
        }
        else if (isMathGex.test(reg)) {
        }
        else if (isXML.test(reg)) {
            const result = {
                type: 'XML',
                value: reg,
            };
            return result;
        }
    }
    function TNTBoom(codeList, data = {}, isinclass = false) {
        let index = 0;
        const TNTSymbolTableOWN = data;
        for (const code of codeList) {
            if (/([A-z0-9])+ ?= ?.+/.test(code)) {
                const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(' '));
                const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(' '));
                const process = TNTValueProcess(v[0]);
                if (/let /.test(code)) {
                    TNT.newData(process.type, name[0], process.value, TNTSymbolTableOWN);
                }
                else {
                    TNT.newData(process.type, name[0], process.value, TNT.TNTSymbolTable);
                }
                TNTValueTagProcessing();
            }
            else if (/(for|while|def|render) .+/.test(code)) {
                if (/render/.test(code)) {
                    let html = code.replace(/render /, '');
                    TNTRenderDOM(html, TNTSymbolTableOWN.__slefdom__);
                }
                else if (/while/.test(code)) {
                    const YesorNo = TNTValueProcess((/([^while ]).+/.exec(code))[0]);
                    if (YesorNo) {
                        const endindex = TNTMatchStartSymbol(code, "endwhile", codeList, index);
                        TNTBoom(codeList.splice(index, endindex));
                    }
                }
                else if (/def/.test(code)) {
                    const endindex = TNTMatchStartSymbol(code, "endef", codeList, index);
                }
                else if (/for/.test(code)) {
                }
            }
            else {
                TNTValueProcess(code);
            }
            index = index + 1;
        }
        return TNTSymbolTableOWN;
    }
    function TNTFunctionSplit(code, original = false) {
        let ignoreNext = false;
        let stringIgnoreNext = false;
        const buffer = [];
        let currentString = "";
        for (const i of code) {
            if (ignoreNext) {
                currentString += i;
                if (i === '\\') {
                    stringIgnoreNext = true;
                    continue;
                }
                if (i === '"' && !stringIgnoreNext) {
                    ignoreNext = false;
                }
                if (stringIgnoreNext) {
                    stringIgnoreNext = false;
                }
                continue;
            }
            else {
                if (i === ',') {
                    buffer.push(currentString.trim());
                    currentString = "";
                }
                else if (i === '"') {
                    currentString += i;
                    ignoreNext = true;
                }
                else {
                    currentString += i;
                }
            }
        }
        if (currentString !== "") {
            buffer.push(currentString.trim());
            currentString = "";
        }
        const values = { agv: [], functioncanvalue: {} };
        for (const value of buffer) {
            if (/.+ ?= ?.+/.test(value)) {
                const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(' '));
                const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(' '));
                values.functioncanvalue[name[0]] = TNTValueProcess(v[0]);
            }
            else {
                if (original) {
                    values.agv.push(TNTValueProcess(value));
                }
                else {
                    values.agv.push(value);
                }
            }
        }
        return values;
    }
    function TNTDefineFunction(func_data, In_data) {
        const name = /[^\(.+\)]+/.exec(func_data)[0].replace(/\s*/g, "");
        let __parameters__ = /\(.+\)/.exec(func_data);
        let __parameter__ = __parameters__[0];
        __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
        TNT.TNTSymbolTable[name] = {
            type: "tnt",
            parameter: TNTFunctionSplit(__parameter__, true),
            canparameter: TNTFunctionSplit(__parameter__).functioncanvalue,
            code: In_data
        };
    }
    function TNTRenderDOM(HTML, DOM) {
        DOM.innerHTML = HTML;
        TNTValueTagProcessing();
        TNTTagProcessing();
    }
    function TNTCodeSplit(code) {
        let ignoreNext = false;
        let stringIgnoreNext = false;
        const buffer = [];
        let currentString = "";
        for (const i of code) {
            if (ignoreNext) {
                currentString += i;
                if (i === '\\') {
                    stringIgnoreNext = true;
                    continue;
                }
                if (i === '"' && !stringIgnoreNext) {
                    ignoreNext = false;
                }
                if (stringIgnoreNext) {
                    stringIgnoreNext = false;
                }
                continue;
            }
            else {
                if (i === ';') {
                    buffer.push(currentString);
                    currentString = "";
                }
                else if (i === '"') {
                    currentString += i;
                    ignoreNext = true;
                }
                else {
                    currentString += i;
                }
            }
        }
        if (currentString !== "") {
            buffer.push(currentString);
            currentString = "";
        }
        return buffer;
    }
    function TNTValueTagProcessing() {
        const val = document.getElementsByTagName("v");
        for (const va of val) {
            if (va.getAttribute('data-rendered') === null) {
                const re = TNTValueTagValueRenderer(va.innerHTML);
                va.setAttribute('data-rendered', 'YES');
                va.setAttribute('data-v-content', va.innerHTML);
                va.innerHTML = `<span>${re}</span>`;
            }
            else {
                const vContent = va.getAttribute('data-v-content');
                const re = TNTValueTagValueRenderer(vContent);
                va.innerHTML = `<span>${re}</span>`;
            }
        }
    }
    TNT.TNTValueTagProcessing = TNTValueTagProcessing;
    function TNTValueTagValueRenderer(tagValue) {
        if (TNT.TNTSymbolTable[tagValue.trim()] === undefined) {
            throw new Error(`Undefined TNT variable: ${tagValue.trim()}`);
        }
        return TNT.TNTSymbolTable[tagValue.trim()].value;
    }
    function TNTTagProcessing() {
        const tntCodes = document.getElementsByTagName("tnt");
        for (const tntCode of tntCodes) {
            tntCode.style.display = "none";
            TNTBoom(TNTCodeSplit(tntCode.innerHTML.toString()), { __slefdom__: tntCode, });
        }
    }
    TNT.TNTTagProcessing = TNTTagProcessing;
    function TNTGetBrowserType() {
        const userAgent = navigator.userAgent;
        let browser = 'unknown';
        if (userAgent.indexOf("IE") !== -1) {
            browser = "IE";
        }
        else if (userAgent.indexOf('Firefox') !== -1) {
            browser = "Firefox";
        }
        else if (userAgent.indexOf('OPR') !== -1) {
            browser = "Opera";
        }
        else if (userAgent.indexOf('Chrome') !== -1) {
            browser = "Chrome";
        }
        else if (userAgent.indexOf('Safari') !== -1) {
            browser = "Safari";
        }
        else if (userAgent.indexOf('Trident') !== -1) {
            browser = 'IE 11';
        }
        return browser;
    }
    TNT.TNTGetBrowserType = TNTGetBrowserType;
})(TNT || (TNT = {}));
//# sourceMappingURL=tnt.js.map