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
    print: {jsfunction: function (x) {
        console.log(x);
    },
},
    explorerType: TNTGetBrowserType()
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
    if (isNumber.test(reg)) {
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
    } else if (/.+\(.+\)/.test(code)) { // Interpreting function content
        const name = /[^\(.+\)]+/.exec(code);
        if (TNTSymbolTable[name[0]]['type'] === 'javascript_function') {
            // TODO: Javascript function implementation
        }
    } 
}

function TNTBoom(codeList) {
    let index = 0;
    let TNTSymbolTable = {}
    for (const code of codeList) {
        if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
            const v = /[^ =]/.exec(/^(([A-z0-9])+ ?= ?)/.exec(code));
            // const v = /[^ =]/.exec(code);
            // const v = /^(([A-z0-9])+ ?= ?)/.exec(code);
            const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code));
            console.log(v);
            console.log(name[0]);
            TNTSymbolTable[name[0]] = v[0];
            console.log(TNTSymbolTable);
            // Refresh the page.
            TNTValueTagProcessing();
        } else if (/(for|while|def) .+/.test(code)) {
            if (/while/.test(code)) {
                const YesorNo = TNTValueProcess((/([^while ]).+/.exec(code))[0]);
                if (YesorNo) {
                    const endindex = TNTMatchStartSymbol(code, "endwhile", codeList, index);
                    TNTBoom(codeList.split(index,endindex));
                }
            } else if (/def/.test(code)) {
                let func = /[^ ]+/.exec(code)
                console.log(func);
            }
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
    const values = {agv:[],functioncanvalue:{}};
    for (const value of buffer) {
        if (/.+ ?= ?.+/.test(value)) {
            const v = /^(([A-z0-9])+ ?= ?)/.exec(code);
            const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code));
            values.functioncanvalue[name[0]] = TNTValueProcess(v);
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
        console.log("Changed");
    }, 1000);
};