/* 
 * BugDuck Organization
 * v0.2
 * File: tnt.js
 * Last Update Time: 04/08/2022
 * License: GPL-2.0
 * All right reserved.
 */

const TNT = (() => {
    return {
        // An API to edit the content of V tag correctly.
        setVtagContent(vTag, newValue) {
            if (vTag.tagName !== "V" || typeof (newValue) !== "string") {
                throw new Error("vTag should be a V html element.");
            }
            if (vTag.getAttribute("data-rendered") === null) {
                vTag.innerHTML = newValue;
            } else {
                vTag.setAttribute("data-v-content", newValue);
            }
            TNTValueTagProcessing();
        }
    };
})();

let TNTSymbolTable = {
    PI: 3.14159265,
    test: 2333,
    print: function (x) {
        console.log(x);
    },
    explorerType: TNTGetBrowserType(),
    ebyid: function(id,iHTML){
        document.getElementById(id).innerHTML = innerHTML
    }
};

// startSymbol and endSymbol are strings that determines the start symbol and the end symbol. For example,
// if you want to match parentheses "()", then the start symbol will be "(" and the end symbol will be ")".
// data is the data array like ["(", "a", "(", "b", ..., ")", ")"]. And startIndex is the index you want to
// match.
function TNTMatchStartSymbol(startSymbol, endSymbol, data, startIndex) {
    const stack = [];
    stack.push(1);
    for (let i = startIndex + 1; i < data.length; i++) {
        // Iterate each data element.
        if (data[i] === startSymbol) {
            // If it's the start symbol, then push a flag into the stack.
            stack.push(1);
        }
        if (data[i] === endSymbol) {
            // If it's the end symbol, then pop a flag from the stack.
            stack.pop();
            if (stack.length === 0) {
                // If the stack is empty after popping the element
                return i;
            }
        }
    }
    return -1;
}

// This function evaluates the value of the expression.
function TNTValueProcess(reg) {
    // Regular Expression
    const isString = /(\"|\').+(\"|\')/;
    const isNumber = /[0-9]+/;
    const isBool = /(true|false)/;
    const isVar = /[_A-z0-9]/;
    const isMathGex = /(.+ ?(\+|-|\*|\/)+ ?.+)+/;
    if (/.+\(.+\)/.test(reg)) { // Interpreting function content
        const name = /[^\(.+\)]+/.exec(reg)[0].replace(/\s*/g, "");
        // console.log(name);
        // console.log(typeof TNTSymbolTable[name]);
        if (typeof (TNTSymbolTable[name]) == 'function') {
            let buffer = "";
            // console.log(TNTSymbolTable[name]);
            // console.log("YesRegex!");
            // TODO: Javascript function implementation
            // console.log(reg);
            let __parameter__ = /\(.+\)/.exec(reg);
            // console.log(__parameter__);
            // const parameter = __parameter__.split(1,__parameter__.length-1);
            // // const parameter = /[^\(\)]/.exec(__parameter__)
            // console.log(__parameter__[0]);
            __parameter__ = __parameter__[0];
            // __parameter__ = __parameter__.substr(1);
            __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
            // console.log(__parameter__);
            const parameters = TNTFunctionSplit(__parameter__);
            // console.log(parameters);
            for (const i of parameters['agv']) {
                buffer = buffer + i;
                buffer = buffer + ',';
            } for (i in parameters['functioncanvalue']) {
                buffer = buffer + i + '=' + ',';
            }
            // console.log(buffer);
            eval(`TNTSymbolTable.${name}(${buffer})`)
        }
    } else if (isNumber.test(reg)) {
        // Number literal processing
        return Number(reg);
    } else if (isString.test(reg)) {
        // TODO: Implement the string literal processing
    } else if (isBool.test(reg)) {
        // Boolean literal processing
        return Boolean(reg);
    } else if (isVar.test(reg)) {
        // Variable processing
        return TNTSymbolTable[reg];


    } else if (isMathGex.test(reg)) {
        let TNTGEX;
        let TNTGEXList = []
        let OneTNTV = "";
        let buffer;
        for (let i of reg) {
            if (i !== ' ') {
                TNTGEX = TNTGEX + i;
            }
        } for (let i of TNTGEX) {
            if (i === "+" || "-" || "*" || "/") {
                // TNTGEXList.push(OneTNTV);
                // TNTGEXList.push(i);
                buffer = buffer + String(TNTValueProcess(OneTNTV));
                buffer = buffer + i;
                OneTNTV = ""
            } else {
                OneTNTV = OneTNTV + i;
            }
            return eval(buffer);
            // } for (let i of TNTGEXList) {
            //     // TODO: Math
        }
    }
}

function TNTBoom(codeList, data = {}, isinclass = false) {
    let index = 0;
    let TNTSymbolTableOWN = data
    // console.log(codeList);
    for (const code of codeList) {
        // console.log(code);
        if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
            // const nameAndValue = /[^ =]+/.exec(code);
            // console.log(nameAndValue);
            // const v = /[^ =]/.exec(code);
            // const v = /^(([A-z0-9])+ ?= ?)/.exec(code);
            const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code));
            const v = /[^= ]+/.exec(/= ?.+/.exec(code))
            // console.log(v);
            // console.log(name);
            if (/let /.test()) {
                TNTSymbolTableOWN[name[0]] = v[0];
            } else {
                TNTSymbolTable[name[0]] = v[0];
            }
            // console.log(TNTSymbolTable);
            // Refresh the page.
            TNTValueTagProcessing();
        } else if (/(for|while|def) .+/.test(code)) {
            if (/while/.test(code)) {
                const YesorNo = TNTValueProcess((/([^while ]).+/.exec(code))[0]);
                if (YesorNo) {
                    const endindex = TNTMatchStartSymbol(code, "endwhile", codeList, index);
                    TNTBoom(codeList.split(index, endindex));
                }
            } else if (/def/.test(code)) {
                const endindex = TNTMatchStartSymbol(code, "endef", codeList, index)
                TNTSymbolTable;
                // let func = /[^ ]+/.exec(code)
                // console.log(func);
            }
        } else {
            console.log("oh");
            TNTValueProcess(code);
        }
        index = index + 1;
    }
}

function TNTFunctionSplit(code) {
    let ignoreNext = false;
    let stringIgnoreNext = false;
    const buffer = [];
    let currentString = "";
    // Iterate every charaters in the code
    for (const i of code) {
        // Next will be ignored (In this case, means in a string.)
        if (ignoreNext) {
            // Add the current char to the string.
            currentString += i;
            if (i === '\\') {
                // Escaping characters
                stringIgnoreNext = true;
                continue;
            }
            if (i === '"' && !stringIgnoreNext) {
                // End the string.
                ignoreNext = false;
            }
            if (stringIgnoreNext) {
                stringIgnoreNext = false;
            }
            continue;
        } else {
            if (i === ',') {
                buffer.push(currentString.trim());
                currentString = "";
            } else if (i === '"') {
                currentString += i;
                ignoreNext = true;
            } else {
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
            const v = /[^= ]+/.exec(/= ?.+/.exec(code))
            const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code));
            values.functioncanvalue[name[0]] = TNTValueProcess(v[0]);
        } else {
            values.agv.push(TNTValueProcess(value));
        }
    }
    return values;
}


// This function splits code with ";"
function TNTCodeSplit(code) {
    let ignoreNext = false;
    let stringIgnoreNext = false;
    const buffer = [];
    let currentString = "";
    // Iterate every charaters in the code
    for (const i of code) {
        // Next will be ignored (In this case, means in a string.)
        if (ignoreNext) {
            // Add the current char to the string.
            currentString += i;
            if (i === '\\') {
                // Escaping characters
                stringIgnoreNext = true;
                continue;
            }
            if (i === '"' && !stringIgnoreNext) {
                // End the string.
                ignoreNext = false;
            }
            if (stringIgnoreNext) {
                stringIgnoreNext = false;
            }
            continue;
        } else {
            if (i === ';') {
                buffer.push(currentString);
                currentString = "";
            } else if (i === '"') {
                currentString += i;
                ignoreNext = true;
            } else {
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

// Processes the <v></v> tag and replaces them into values
function TNTValueTagProcessing() {
    const val = document.getElementsByTagName("v");
    for (const va of val) {
        if (va.getAttribute('data-rendered') === null) {
            const re = TNTValueTagValueRenderer(va.innerHTML);
            va.setAttribute('data-rendered', 'YES');
            va.setAttribute('data-v-content', va.innerHTML);
            va.innerHTML = `<span>${re}</span>`;
        } else {
            const vContent = va.getAttribute('data-v-content');
            const re = TNTValueTagValueRenderer(vContent);
            va.innerHTML = `<span>${re}</span>`;
        }
    }
}

// Rendering the <v> tag content to the value.
function TNTValueTagValueRenderer(tagValue) {
    return TNTSymbolTable[tagValue.trim()];
}

// Processes the <tnt> tag.
function TNTTagProcessing() {
    const tntCodes = document.getElementsByTagName("tnt");
    for (const tntCode of tntCodes) {
        tntCode.style.display = "none";
        TNTBoom(TNTCodeSplit(tntCode.innerHTML.toString()));
    }
}

function TNTGetBrowserType() {
    const userAgent = navigator.userAgent;
    let browser = 'unknown';
    if (userAgent.indexOf("IE") !== -1) {
        browser = "IE";
    } else if (userAgent.indexOf('Firefox') !== -1) {
        browser = "Firefox";
    } else if (userAgent.indexOf('OPR') !== -1) {
        browser = "Opera";
    } else if (userAgent.indexOf('Chrome') !== -1) {
        browser = "Chrome";
    } else if (userAgent.indexOf('Safari') !== -1) {
        browser = "Safari";
    } else if (userAgent.indexOf('Trident') !== -1) {
        browser = 'IE 11';
    }
    return browser;
}

window.onload = () => {
    TNTValueTagProcessing();
    TNTTagProcessing();
    setTimeout(() => {
        TNTSymbolTable["test"] = 114514;
        TNTValueTagProcessing();
        // console.log("Changed");
    }, 1000);
    // console.log(TNTFunctionSplit("x,3"));
    // console.log(TNTValueProcess("print(5,15)"));
};     
