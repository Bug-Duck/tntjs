/* 
 * BugDuck Organization
 * v0.2
 * File: tnt.js
 * Last Update Time: 04/07/2022
 * License: GPL v2.0
 * All right reserved.
 */

var TNTSymbolTable = {
    test: 444,
    log: function (x) {

    }
}

// This function evaluates the value of the expression.
function TNTValueProcess(reg) {
    // Regular Expression
    let isstring = /(\"|\').+(\"|\')/;
    let isnumber = /[0-9]+/;
    let isbool = /(true|false)/
    let isvar = /[_A-z0-9]/
    if (isnumber.test(reg)) {
        // Number literal processing
        return Number(reg)
    } else if (isstring.test(reg)) {
        // TODO: Implement the string literal processing
    } else if (isbool.test(reg)) {
        // Boolean literal processing
        return Boolean(reg)
    } else if (isvar.test(reg)) {
        // Variable processing
        return TNTSymbolTable[reg]
    }
}

function TNTBoom(codeList) {
    for (code in codeList) {
        if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
            let v = /^(([A-z0-9])+ ?= ?)/.exec(code);
            let name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code))
            TNTSymbolTable[name] = v
        } else if (/.+\(.+\)/.test(code)) { // Interpreting function content
            let name = /^(\(\))/.exec(code);
            if (TNTSymbolTable[name][type] == 'javascript_function') {
                // TODO: Javascript function implementation
            } else if (TNTSymbolTable[name][type] == 'tnt_function') {
                TNTBoom(TNTSymbolTable.name.type.code) // Recursion
            }
        }
    }
}

// This function splits code with ";"
function TNTCodeSplit(code) {
    let ignoreNext = false;
    let stringIgnoreNext = false;
    let buffer = [];
    let currentString = "";
    // Iterate every charaters in the code
    for (let i of code) {
        // Next will be ignored (In this case, means in a string.)
        if (ignoreNext) {
            // Add the current char to the string.
            currentString += i;
            if (i == '\\') {
                // Escaping characters
                stringIgnoreNext = true;
                continue;
            }
            if (i == '"' && !stringIgnoreNext) {
                // End the string.
                ignoreNext = false;
            }
            if (stringIgnoreNext) {
                stringIgnoreNext = false;
            }
            continue;
        } else {
            if (i == ';') {
                buffer.push(currentString);
                currentString = "";
            } else if (i == '"') {
                currentString += i;
                ignoreNext = true;
            } else {
                currentString += i;
            }
        }
    }
    if (currentString != "") {
        buffer.push(currentString);
        currentString = "";
    }
    return buffer;
}

// Processes the <v></v> tag and replaces them into values
function TNTValueTagProcessing() {
    let val = document.getElementsByTagName("v");
    for (va in val) {
        let re = TNTSymbolTable[va.innerHTML];
        document.write(re)
    }
}

// Processes the <tnt> tag.
function TNTTagProcessing() {
    tnt_codes = document.getElementsByTagName("tnt");
    for (tnt_code in tnt_codes) {
        TNTBoom(TNTCodeSplit(tnt_code.innerHTML));
    }
}

TNTValueTagProcessing();
TNTTagProcessing();