/**
 * file: ScriptExecutor.ts
 * creator: 27Onion, Acbox
 * create time: May 10th, 2022, 21:18
 * description: The TNT script executor.
 * main developer: sheepbox8646
 */

/**
 * You may think you know what the following code does.
 * But you dont. Trust me.
 * Fiddle with it, and youll spend many a sleepless
 * night cursing the moment you thought youd be clever
 * enough to "optimize" the code below.
 * Now close this file and go play with something else.
 */

export class TNTScript {
    type value = {
        type: string;
        value: any
    }

    export class ScriptExecutor {
      SymbolTableOWN: TNT.SymbolTable;
      exec(scriptContent: string, data: TNT.SymbolTable = new TNT.SymbolTable()) {
        this.SymbolTableOWN = data; // Inner data space
        ScriptRun.RunScriptCode(scriptContent, this);
      }

      ValueProcess(reg: string) {
        // Regular Expression
        const isString = /("|').+("|')/;
        const isNumber = /[0-9]+/;
        const isBool = /(true|false)/;
        const isVar = /[_A-z0-9]/;
        const isMathGex = /(.+ ?(\+|-|\*|\/)+ ?.+)+/;
        const isXML = /<.+>/;
        const iscodes = /\{.+\}/;
        if (/.+\(.+\)/.test(reg)) { // Interpreting function content
          const name = /[^(.+)]+/.exec(reg)[0].replace(/\s*/g, "");
          // TODO: Script类型type值
          if (TNT.Globals.symbolTable.getValue(name).value === "function") {
            let buffer = "";
            const __parameters__ = /\(.+\)/.exec(reg);
            let __parameter__ = __parameters__[0];
            __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
            const parameters = TNTScript.functionSplit(__parameter__);
            for (const i of parameters["agv"]) {
              buffer = buffer + i;
              buffer = buffer + ",";
            }
            for (const i in parameters["functioncanvalue"]) {
              buffer = buffer + i + "=" + ",";
            }
            const results = Function(`TNT.TNTSymbolTable.${name}.value(${buffer})`)();
            const result: value = {
              type: TNTScript.jsTypeToTNTType(typeof (results)),
              value: results,
            };
            return result;
          } else if (TNT.Globals.symbolTable.getValue(name).value === "tnt") {
            // TODO:TNTScript函数调用
            const __parameters__ = /\(.+\)/.exec(reg);
            let __parameter__ = __parameters__[0];
            __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
            // TODO: Parameters is the arguments of the function.
            const parameters = TNTScript.functionSplit(__parameter__);
            const par = {};
            // Get the default parameters and the default values
            // TNTSymbolTable[name].parameter.forEach((ele, i) => {
            //     par[ele] = parameters.agv[i];
            // });
            // for (const key in TNTSymbolTable[name].canparameter) {
            //     par[key] = TNTSymbolTable[name].canparameter[key];
            // }
            // // Merge optional parameters
            // for (const key in TNTSymbolTable[name].canparameter) {
            //     par[key] = parameters.functioncanvalue[key];
            // }
            // this.exec(TNTSymbolTable[name].code, par)
          }
        } else if (iscodes.test(reg)) {
          return {
            type: "code",
            value: TNTScript.codeSplit(reg.substring(1, reg.length - 1)),
          };
        } else if (isNumber.test(reg)) {
          // Number literal processing
          return {
            type: "number",
            value: Number(reg)
          };
        } else if (isString.test(reg)) {
          // TODO: Implement the string literal processing
        } else if (isBool.test(reg)) {
          // Boolean literal processing
          return {
            type: "bool",
            value: Boolean(reg),
          };
        } else if (isVar.test(reg)) {
          // Variable processing
          const results = TNT.Globals.symbolTable.getValue(reg).value;
          const result: value = {
            type: TNTScript.jsTypeToTNTType(typeof (results)),
            value: results,
          };
          return result;
        } else if (isMathGex.test(reg)) {
          //TODO: 表达式
        } else if (isXML.test(reg)) {
          return {
            type: "XML",
            value: reg,
          };
        }
      }

      // ------------------------------------------------------------------------

      renderDOM(HTML: string, DOM: HTMLElement) {
        DOM.innerHTML = HTML;
        // TNTValueTagProcessing();
        // TNTTagProcessing();
      }
      evaluate(expression: string): any {
        // TODO: evaluate the value
        const value = TNT.Globals.symbolTable.getValue(expression.trim());
        if (value.type === TNT.StringType) {
          return value.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        return value.value;
      }
    }
}
