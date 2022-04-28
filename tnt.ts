/* 
 * BugDuck Organization
 * v0.0.3
 * File: tnt.ts
 * Last Update Time: 04/18/2022
 * License: MIT
 * All right reserved.
 */

namespace TNT {

    type value = {
        type: string;
        value: any;
        parameter?: {
            agv: any[],
            functioncanvalue: any,
        };
        canparameter?: any;
        code?: (string[] | Function);
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
    export function TNTValueProcess(reg: string) {
        // Regular Expression
        const isString = /(\"|\').+(\"|\')/;
        const isNumber = /[0-9]+/;
        const isBool = /(true|false)/;
        const isVar = /[_A-z0-9]/;
        const isMathGex = /(.+ ?(\+|-|\*|\/)+ ?.+)+/;
        const isXML = /<.+>/;
        const iscodes = /\{.+\}/
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
                const result: value = {
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
        } else if (iscodes.test(reg)) {
            return {
                type: 'code',
                value: TNTCodeSplit(reg.substring(1,reg.length - 1)),
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
            const result: value = {
                type: JsTypeToTNTType(typeof (results)),
                value: results,
            };
            return result;
        } else if (isMathGex.test(reg)) {
            //TODO: Math Regex!
        } else if (isXML.test(reg)) {
            const result: value = {
                type: 'XML',
                value: reg,
            }
            return result;
        }
    }

    function TNTBoom(codeList: string[], data: any = {}, isinclass: boolean = false) {
        let index = 0;
        const TNTSymbolTableOWN = data; // Inner data space
        let Errors: TNTError = new TNTError(TNTSymbolTableOWN.__selfdom__)
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
                    TNTRenderDOM(html, TNTSymbolTableOWN.__selfdom__)
                } else if (/while/.test(code)) {
                    const YesorNo = TNTValueProcess((/([^while ]).+/.exec(code))[0]);
                    if (YesorNo) {
                        const endindex = TNTMatchStartSymbol(code, "endwhile", codeList, index);
                        TNTBoom(codeList.splice(index, endindex));
                    }
                } else if (/def/.test(code)) {
                    // TODO: def a function
                } else if (/for/.test(code)) {
                    //TODO: for over and over again until last value
                }
            } else {
                TNTValueProcess(code);
            }
            index = index + 1;
            Errors.line += 1;
        }
        return TNTSymbolTableOWN;
    }

    function TNTRenderDOM(HTML: string, DOM: HTMLElement) {
        DOM.innerHTML = HTML;
        TNTValueTagProcessing();
        TNTTagProcessing();
    }

    
    // Rendering the <v> tag content to the value.
    export function TNTValueTagValueRenderer(tagValue: string): any {
        if (TNTSymbolTable[tagValue.trim()] === undefined) {
            throw new Error(`Undefined TNT variable: ${tagValue.trim()}`);
        }
        return TNTSymbolTable[tagValue.trim()].value;
    }


    // Processes the <v></v> tag and replaces them into values
    export function TNTValueTagProcessing() {
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

    // Processes the <tnt> tag.
    export function TNTTagProcessing(): void {
        const tntCodes = document.getElementsByTagName("tnt");
        for (const tntCode of tntCodes) {
            (tntCode as HTMLElement).style.display = "none";
            //以内部变量的方式传入当前标签的DOM!
            TNTBoom(TNTCodeSplit(tntCode.innerHTML.toString()), { __slefdom__: tntCode, });
        }
    }

    export function TNTGetBrowserType() {
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
}
