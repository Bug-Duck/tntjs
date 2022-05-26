/**
 * You may think you know what the following code does.
 * But you dont. Trust me.
 * Fiddle with it, and youll spend many a sleepless
 * night cursing the moment you thought youd be clever
 * enough to "optimize" the code below.
 * Now close this file and go play with something else.
 */

namespace ScriptRun {
    export function RunScriptCode(codes,dataobj) {
        const codeList = init(codes);
        let index = 1
        for (const code of codeList) {
            lineRun(code);
            index += 1;
            // Errors.line += 1;
        }
        return dataobj.SymbolTableOWN
    }

    export function init(codes: string) {
        const list = TNTScript.codeSplit(codes);
        return list;
    }

    export function lineRun(code: string) {
        if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
            ScriptRun.VariableCode(code, this)
        } else if (/(for|while|def|render|when) .+/.test(code)) {
            if (/render/.test(code)) {
                ScriptRun.RenderCode(code, this)
            } else if (/while/.test(code)) {
                ScriptRun.WhileCode(code)
            } else if (/def/.test(code)) {
                // TODO: 定义函数语句
            } else if (/for/.test(code)) {
                //TODO: for循环
            }
        } else if (code === 'break') {
            // 如果检测到跳出循环语句 则返回"break"
            return "break"
        } else {
            this.ValueProcess(code);
        }
    }
    
    export const VariableCode = (code: string, dataobj) => {
        const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(' '));
        const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(' '));
        const process = dataobj.ValueProcess(v[0]);
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
            TNT.Globals.symbolTable.setValue(process.type, process.value)
        }
        // Refresh the page.
        // TNTValueTagProcessing();
    }

    export const RenderCode = (code: string, dataobj) => {
        const html = TNTScript.keySearch('render', code)
        // TODO: 渲染render关键字
        // TNTRenderDOM(html, TNTSymbolTableOWN.__selfdom__)
    }

    export const WhileCode = (code: string) => {
        const i = TNTScript.codeBlock(TNTScript.keySearch('while', code));
        const condition = i[0];
        const codes = i[1];
        // 如果TNTBoom函数返回true 即代表识别到跳出语句 则跳出循环
        // TODO: 这里类型监测出了点问题，因此注释
        // while (this.ValueProcess(condition)) {
        //     if (this.exec(codes)) {
        //         break;
        //     }
        // }
    }

    export const ImportCode = (code:string, dataobj) => {
        const pake = TNTScript.keySearch('import',code);
        const pakege = dataobj.ValueProcess(pake);
        const http = new XMLHttpRequest();
        const filecode = http.open('GET',pakege,false);
        const Variable = RunScriptCode(filecode, dataobj);
        TNT.Globals.symbolTable.merge(Variable,(TNT.Globals.symbolTable.getValue("w").value))
    }
}