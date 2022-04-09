/* 
 * BugDuck Organization
 * v0.2
 * File: tnt.js
 * Last Update Time: 04/08/2022
 * License: GPL v2.0
 * All right reserved.
 */

const TNT = (function() {
    return {
        // An API to edit the content of V tag correctly.
        setVtagContent(vTag, newValue) {
            if (vTag.tagName !== "V" || typeof(newValue) !== "string") {
                throw new Error("vTag should be a V html element.");
            }
            if (vTag.getAttribute("data-rendered") === null) {
                vTag.innerHTML = newValue;
            } else {
                vTag.setAttribute("data-v-content", newValue);
            }
        } 
    };
})();

let TNTSymbolTable = {
    test: 444,
    log: function (x) {
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
    const isstring = /(\"|\').+(\"|\')/;
    const isnumber = /[0-9]+/;
    const isbool = /(true|false)/;
    const isvar = /[_A-z0-9]/;
    if (isnumber.test(reg)) {
        // Number literal processing
        return Number(reg);
    } else if (isstring.test(reg)) {
        // TODO: Implement the string literal processing
    } else if (isbool.test(reg)) {
        // Boolean literal processing
        return Boolean(reg);
    } else if (isvar.test(reg)) {
        // Variable processing
        return TNTSymbolTable[reg];
    }
}

function TNTBoom(codeList) {
    let index = 0;
    for (const code of codeList) {
        if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
            const v = /^(([A-z0-9])+ ?= ?)/.exec(code);
            const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code));
            TNTSymbolTable[name] = v;
        } else if (/.+\(.+\)/.test(code)) { // Interpreting function content
            const name = /^(\(\))/.exec(code);
            if (TNTSymbolTable[name]['type'] === 'javascript_function') {
                // TODO: Javascript function implementation
            } else if (TNTSymbolTable[name]['type'] === 'tnt_function') {
                TNTBoom(TNTSymbolTable.name.type.code); // Recursion
            }
        } else if (/(for|while)/.test(code)) {
            if (/while/.test(code)) {
                const YesorNo = TNTValueProcess(/([^while ]).+/.exec(code));
                if (YesorNo) {
                    TNTMatchStartSymbol(code,"endwhile",codeList,index);
                }
            }
            index = index + 1;
        }
    }
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
            const re = TNTValueTagValueRenderer(va.innerHTML)
            va.setAttribute('data-rendered', 'YES')
            va.setAttribute('data-v-content', va.innerHTML)
            va.innerHTML = `<span>${re}</span>`
        } else {
            const vContent = re.getAttribute('data-v-content');
            const re = TNTValueTagValueRenderer(vContent)
            va.innerHTML = `<span>${re}</span>`
        }
    }
}

// Rendering the <v> tag content to the value.
function TNTValueTagValueRenderer(tagValue) {
    return TNTSymbolTable[tagValue];
}

// Processes the <tnt> tag.
function TNTTagProcessing() {
    const tntCodes = document.getElementsByTagName("tnt");
    for (const tntCode of tntCodes) {
        TNTBoom(TNTCodeSplit(tntCode.innerHTML.toString()));
    }
}

TNTValueTagProcessing();
TNTTagProcessing();
