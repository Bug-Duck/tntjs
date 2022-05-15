/**
 * file: ScriptExecutor.ts
 * creator: 27Onion
 * create time: May 10th, 2022, 21:18
 * description: The TNT script executor.
 * main developer: sheepbox8646
 */

namespace TNTScript {
    type value = {
        type: string;
        value: any
    }

    export class ScriptExecutor {
        exec(scriptContent: string, data: Object = {}) {
            const codeList = TNTScript.TNTCodeSplit(scriptContent);
            let index = 0;
            const TNTSymbolTableOWN = data; // Inner data space
            // let Errors: TNTError = new TNTError(TNTSymbolTableOWN.__selfdom__)
            for (const code of codeList) {
                if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
                    const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(' '));
                    const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(' '));
                    const process = this.ValueProcess(v[0]);
                    // TODO: 变量赋值的值重构后存储
                    if (/let /.test(code)) {
                        // TODO:局部变量赋值
                        // newData(
                        //     process.type,
                        //     name[0],
                        //     process.value,
                        //     TNTSymbolTableOWN,
                        // );
                    } else {
                        TNT.Globals.symbolTable.setValue(process.type,process.value)
                    }
                    // Refresh the page.
                    // TNTValueTagProcessing();
                } else if (/(for|while|def|render) .+/.test(code)) {
                    if (/render/.test(code)) {
                        const html = keySearch('render', code)
                        // TODO: 渲染render关键字
                        // TNTRenderDOM(html, TNTSymbolTableOWN.__selfdom__)
                    } else if (/while/.test(code)) {
                        const i = codeKuai(keySearch('while', code));
                        const condition = i[0];
                        const codes = i[1];
                        // 如果TNTBoom函数返回true 即代表识别到跳出语句 则跳出循环
                        while (this.ValueProcess(condition)) {
                            if (this.exec(codes)) {
                                break;
                            }
                        }
                    } else if (/def/.test(code)) {
                        // TODO: 定义函数语句
                    } else if (/for/.test(code)) {
                        //TODO: for循环
                    }
                } else if (code === 'break') {
                    // 如果检测到跳出循环语句 则返回true
                    return true
                } else {
                    this.ValueProcess(code);
                }
                index = index + 1;
                // Errors.line += 1;
            }
            return TNTSymbolTableOWN;
            // TODO: Fill in this function to execute the script. The content is given.
            // console.log(scriptContent);
        }

        ValueProcess(reg: string) {
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
                    const results = Function(`TNT.TNTSymbolTable.${name}.value(${buffer})`)();
                    const result: value = {
                        type: JsTypeToTNTType(typeof (results)),
                        value: results,
                    };
                    return result;
                } else if (TNT.Globals.symbolTable.getValue(name) === 'tnt') {
                    // TODO:TNTScript函数调用
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
                    this.exec(TNTSymbolTable[name].code, par)
                }
            } else if (iscodes.test(reg)) {
                return {
                    type: 'code',
                    value: TNTCodeSplit(reg.substring(1, reg.length - 1)),
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
                //TODO: 表达式
            } else if (isXML.test(reg)) {
                const result: value = {
                    type: 'XML',
                    value: reg,
                }
                return result;
            }
        //     const codeList = TNTScript.TNTCodeSplit(scriptContent);
        //     let index = 0;
        //     const TNTSymbolTableOWN = data; // Inner data space
        //     // let Errors: TNTError = new TNTError(TNTSymbolTableOWN.__selfdom__)
        //     for (const code of codeList) {
        //         if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
        //             const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(' '));
        //             const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(' '));
        //             const process = this.ValueProcess(v[0]);
        //             // TODO: 变量赋值的值重构后存储
        //             // if (/let /.test(code)) {
        //             //     newData(
        //             //         process.type,
        //             //         name[0],
        //             //         process.value,
        //             //         TNTSymbolTableOWN,
        //             //     );
        //             // } else {
        //             //     newData(
        //             //         process.type,
        //             //         name[0],
        //             //         process.value,
        //             //         TNTSymbolTable,
        //             //     );
        //             // }
        //             // // Refresh the page.
        //             // TNTValueTagProcessing();
        //         } else if (/(for|while|def|render) .+/.test(code)) {
        //             if (/render/.test(code)) {
        //                 const html = keySearch('render', code)
        //                 // TODO: 渲染render关键字
        //                 // TNTRenderDOM(html, TNTSymbolTableOWN.__selfdom__)
        //             } else if (/while/.test(code)) {
        //                 const i = codeKuai(keySearch('while', code));
        //                 const condition = i[0];
        //                 const codes = i[1];
        //                 // 如果TNTBoom函数返回true 即代表识别到跳出语句 则跳出循环
        //                 while (this.ValueProcess(condition)) {
        //                     if (this.exec(codes)) {
        //                         break;
        //                     }
        //                 }
        //             } else if (/def/.test(code)) {
        //                 // TODO: 定义函数语句
        //             } else if (/for/.test(code)) {
        //                 //TODO: for循环
        //             }
        //         } else if (code === 'break') {
        //             // 如果检测到跳出循环语句 则返回true
        //             return true
        //         } else {
        //             this.ValueProcess(code);
        //         }
        //         index = index + 1;
        //         // Errors.line += 1;
        //     }
        //     return TNTSymbolTableOWN;
        //     // TODO: Fill in this function to execute the script. The content is given.
        //     // console.log(scriptContent);
        // }

        // ValueProcess(reg: string) {
        //     // Regular Expression
        //     const isString = /(\"|\').+(\"|\')/;
        //     const isNumber = /[0-9]+/;
        //     const isBool = /(true|false)/;
        //     const isVar = /[_A-z0-9]/;
        //     const isMathGex = /(.+ ?(\+|-|\*|\/)+ ?.+)+/;
        //     const isXML = /<.+>/;
        //     const iscodes = /\{.+\}/
        //     if (/.+\(.+\)/.test(reg)) { // Interpreting function content
        //         const name = /[^\(.+\)]+/.exec(reg)[0].replace(/\s*/g, "");
        //         // TODO: Script类型type值
        //         if (TNTSymbolTable[name].type === 'function') {
        //             let buffer = "";
        //             let __parameters__ = /\(.+\)/.exec(reg);
        //             let __parameter__ = __parameters__[0];
        //             __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
        //             const parameters = TNTFunctionSplit(__parameter__)
        //             for (const i of parameters['agv']) {
        //                 buffer = buffer + i;
        //                 buffer = buffer + ',';
        //             }
        //             for (const i in parameters['functioncanvalue']) {
        //                 buffer = buffer + i + '=' + ',';
        //             }
        //             const results = eval(`TNT.TNTSymbolTable.${name}.value(${buffer})`);
        //             const result: value = {
        //                 type: JsTypeToTNTType(typeof (results)),
        //                 value: results,
        //             };
        //             return result;
        //         } else if (TNTSymbolTable[name].type === 'tnt') {
        //             // TODO:TNTScript函数调用
        //             let __parameters__ = /\(.+\)/.exec(reg);
        //             let __parameter__ = __parameters__[0];
        //             __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
        //             // Parameters is the arguments of the function.
        //             const parameters = TNTFunctionSplit(__parameter__);
        //             let par = {};
        //             // Get the default parameters and the default values
        //             TNTSymbolTable[name].parameter.forEach((ele, i) => {
        //                 par[ele] = parameters.agv[i];
        //             });
        //             for (const key in TNTSymbolTable[name].canparameter) {
        //                 par[key] = TNTSymbolTable[name].canparameter[key];
        //             }
        //             // Merge optional parameters
        //             for (const key in TNTSymbolTable[name].canparameter) {
        //                 par[key] = parameters.functioncanvalue[key];
        //             }
        //             this.exec(TNTSymbolTable[name].code, par)
        //         }
        //     } else if (iscodes.test(reg)) {
        //         return {
        //             type: 'code',
        //             value: TNTCodeSplit(reg.substring(1, reg.length - 1)),
        //         }
        //     } else if (isNumber.test(reg)) {
        //         // Number literal processing
        //         return {
        //             type: 'number',
        //             value: Number(reg)
        //         };
        //     } else if (isString.test(reg)) {
        //         // TODO: Implement the string literal processing
        //     } else if (isBool.test(reg)) {
        //         // Boolean literal processing
        //         return {
        //             type: 'bool',
        //             value: Boolean(reg),
        //         };
        //     } else if (isVar.test(reg)) {
        //         // Variable processing
        //         const results = TNTSymbolTable[reg].value;
        //         const result: value = {
        //             type: JsTypeToTNTType(typeof (results)),
        //             value: results,
        //         };
        //         return result;
        //     } else if (isMathGex.test(reg)) {
        //         //TODO: 表达式
        //     } else if (isXML.test(reg)) {
        //         const result: value = {
        //             type: 'XML',
        //             value: reg,
        //         }
        //         return result;
        //     }
        }

        TNTRenderDOM(HTML: string, DOM: HTMLElement) {
            DOM.innerHTML = HTML;
            // TNTValueTagProcessing();
            // TNTTagProcessing();
        }
    }

}

