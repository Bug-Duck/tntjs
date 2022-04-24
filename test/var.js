function vared(code) {
    if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
        const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(' '));
        const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(' '));
        const process = TNTValueProcess(v[0]);
        if (/let /.test(code)) {
            newData(
                process.type,
                name[0],
                process.value,
                TNTSymbolTableOWN,
            );
        } else {
            newData(
                process.type,
                name[0],
                process.value,
                TNTSymbolTable,
            );
        }
    }
}

function newData(type, name, value, datahouse,) {
    datahouse[name] = {
        type: type,
        value: value,
    }
}

let TNTSymbolTable = {
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
    // explorerType: {
    //     type: 'string',
    //     value: TNTGetBrowserType(),
    // },
};

function TNTValueProcess(reg) {
    // Regular Expression
    const isString = /(\"|\').+(\"|\')/;
    const isNumber = /[0-9]+/;
    const isBool = /(true|false)/;
    const isVar = /[_A-z0-9]/;
    const isMathGex = /(.+ ?(\+|-|\*|\/)+ ?.+)+/;
    const isXML = /<.+>/;
    if (/.+\(.+\)/.test(reg)) { // Interpreting function content
        const name = /[^\(.+\)]+/.exec(reg)[0].replace(/\s*/g, "");
        // TODO: Script类型type值
        if (TNTSymbolTable[name].type === 'function') {
            let buffer = "";
            let __parameters__ = /\(.+\)/.exec(reg);
            let __parameter__ = __parameters__[0];
            __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
            const parameters = TNTFunctionSplit(__parameter__)
            for (const i of parameters['agv']) {
                buffer = buffer + i;
                buffer = buffer + ',';
            }
            for (const i in parameters['functioncanvalue']) {
                buffer = buffer + i + '=' + ',';
            }
            const results = eval(`TNTSymbolTable.${name}.value(${buffer})`);
            const result = {
                type: JsTypeToTNTType(typeof (results)),
                value: results,
            };
            return result;
        } else if (TNTSymbolTable[name].type === 'tnt') {
            // TODO:TNT.js's Function's Run!
            let __parameters__ = /\(.+\)/.exec(reg);
            let __parameter__ = __parameters__[0];
            __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
            // Parameters is the arguments of the function.
            const parameters = TNTFunctionSplit(__parameter__);
            let par = {};
            // Get the default parameters and the default values
            TNTSymbolTable[name].parameter.forEach((ele, i) => {
                par[ele] = parameters.agv[i];
            });
            for (const key in TNTSymbolTable[name].canparameter) {
                par[key] = TNTSymbolTable[name].canparameter[key];
            }
            // Merge optional parameters
            for (const key in TNTSymbolTable[name].canparameter) {
                par[key] = parameters.functioncanvalue[key];
            }
            TNTBoom(TNTSymbolTable[name].code, par)
        }
    } else if (isNumber.test(reg)) {
        // Number literal processing
        return {
            type: 'number',
            value: Number(reg)
        };
    } else if (isString.test(reg)) {
        // TODO: Implement the string literal processing
    } else if (isBool.test(reg)) {
        // Boolean literal processing
        return {
            type: 'bool',
            value: Boolean(reg),
        };
    } else if (isVar.test(reg)) {
        // Variable processing
        const results = TNTSymbolTable[reg].value;
        const result = {
            type: JsTypeToTNTType(typeof (results)),
            value: results,
        };
        return result;
    } else if (isMathGex.test(reg)) {
        let TNTGEX = '';
        const TNTGEXList = [];
        let OneTNTV = "";
        let buffer = "";
        for (const i of reg) {
            if (i !== ' ') {
                TNTGEX = TNTGEX + i;
            }
        }
        for (const i of TNTGEX) {
            if (i === "+" || i === "-" || i === "*" || i === "/") {
                buffer = buffer + String(TNTValueProcess(OneTNTV));
                buffer = buffer + i;
                OneTNTV = "";
            } else {
                OneTNTV = OneTNTV + i;
            }
            return eval(buffer);
            // TODO: Math
        }
    } else if (isXML.test(reg)) {

    }
}

function TNTBoom(codeList, data, isinclass = false) {
    let index = 0;
    const TNTSymbolTableOWN = data; // Inner data space
    for (const code of codeList) {
        if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
            const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(' '));
            const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(' '));
            const process = TNTValueProcess(v[0]);
            if (/let /.test(code)) {
                newData(
                    process.type,
                    name[0],
                    process.value,
                    TNTSymbolTableOWN,
                );
            } else {
                newData(
                    process.type,
                    name[0],
                    process.value,
                    TNTSymbolTable,
                );
            }
            // Refresh the page.
            TNTValueTagProcessing();
        } else if (/(for|while|def|render) .+/.test(code)) {
            if (/render/.test(code)) {
                let html = code.replace(/render /, '');
                render(html, TNTSymbolTableOWN.__slefdom__)
            } else if (/while/.test(code)) {
                const YesorNo = TNTValueProcess((/([^while ]).+/.exec(code))[0]);
                if (YesorNo) {
                    const endindex = TNTMatchStartSymbol(code, "endwhile", codeList, index);
                    TNTBoom(codeList.splice(index, endindex));
                }
            } else if (/def/.test(code)) {
                const endindex = TNTMatchStartSymbol(code, "endef", codeList, index);
                // [1, 2, 3, 4, 5].split()
            } else if (/for/.test(code)) {
                //TODO: for over and over again until last value
            }
        } else {
            TNTValueProcess(code);
        }
        index = index + 1;
    }
    return TNTSymbolTableOWN;
}

vared("x=3");
console.log(TNTSymbolTable);
