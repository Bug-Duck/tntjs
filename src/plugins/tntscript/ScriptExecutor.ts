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

import { SymbolTable, VariableValueType, StringType } from "runtime/SymbolTable";
import { Globals } from "runtime/GlobalEnvironment";
import { functionSplit, jsTypeToTNTType, codeSplit, FunctionParameterType } from "./lexicalAnalysis";
import { runScriptCode } from "./ScriptRun";

export interface ValueType {
  type: string;
  value: VariableValueType;
}

export interface ProcessValueType {
  type: string;
  value: VariableValueType;
}

export class ScriptExecutor {
  #innerSymbolTable: SymbolTable;

  exec(scriptContent: string, data: SymbolTable = new SymbolTable()) {
    this.#innerSymbolTable = data;
    runScriptCode(scriptContent, this);
  }

  getFunctionParameter(reg: string, expression = /\(.+\)/): FunctionParameterType {
    const functionParametersMatch = reg.match(expression)[0];
    const parameter = functionParametersMatch.substring(1, functionParametersMatch.length - 1);
    return functionSplit(parameter);
  }

  onFunction (reg: string) {
    const name = /[^(.+)]+/.exec(reg)[0].replace(/\s*/g, "");

    // TODO: Script 类型 type 值
    if (Globals.symbolTable.getValue(name).value === "function") {
      let buffer = "";
      const parameters = this.getFunctionParameter(reg);

      parameters.args.forEach((arg) => {
        buffer = buffer + arg;
        buffer = buffer + ",";
      });
      Object.values(parameters.optionalArgs).forEach((arg) => {
        buffer = buffer + arg + "=,";
      });

      const results = Function(`TNT.TNTSymbolTable.${name}.value(${buffer})`)();
      return {
        type: jsTypeToTNTType(typeof results),
        value: results,
      };
    }
    if (Globals.symbolTable.getValue(name).value === "tnt") {
      // TODO: TNTScript函数调用
      // const parameters = /\(.+\)/.exec(reg);
      // let parameter = parameters[0].substring(1, parameters[0].length - 1);
      // TODO: Parameters is the arguments of the function.
      // const parameters = functionSplit(__parameter__);
      // const par = {};
      // Get the default parameters and the default values
      // TNTSymbolTable[name].parameter.forEach((ele, i) => {
      //     par[ele] = parameters.agv[i];
      // });
      // for (const key in TNTSymbolTable[name].canparameter) {
      //     par[key] = TNTSymbolTable[name].canparameter[key];
      // }
      // // Merge optional parameters
      // for (const key in TNTSymbolTable[name].canparameter) {
      //     par[key] = parameters.optionalArgs[key];
      // }
      // this.exec(TNTSymbolTable[name].code, par)
      return {
        type: "tnt",
        value: "",
      };
    }
  }

  processValue (reg: string) {
    // Regular Expressions
    const isString = /("|').+("|')/;
    const isNumber = /[0-9]+/;
    const isBool = /(true|false)/;
    const isVar = /[_A-z0-9]/;
    const isMathGex = /(.+ ?(\+|-|\*|\/)+ ?.+)+/;
    const isXML = /<.+>/;
    const isCodeBlock = /\{.+\}/;
    const isFunction = /.+\(.+\)/;

    if (isFunction.test(reg)) { // Interpreting function content
      this.onFunction(reg);
    }
    if (isCodeBlock.test(reg)) {
      return {
        type: "code",
        value: codeSplit(reg.substring(1, reg.length - 1)),
      };
    }
    if (isNumber.test(reg)) {
      // Number literal processing
      return {
        type: "number",
        value: Number(reg)
      };
    }
    if (isString.test(reg)) {
      // TODO: Implement the string literal processing
      return {
        type: "string",
        value: reg,
      };
    }
    if (isBool.test(reg)) {
      // Boolean literal processing
      return {
        type: "bool",
        value: Boolean(reg),
      };
    }
    if (isVar.test(reg)) {
      // Variable processing
      const results = Globals.symbolTable.getValue(reg).value;
      const result: ValueType = {
        type: jsTypeToTNTType(typeof (results)),
        value: results,
      };
      return result;
    }
    if (isMathGex.test(reg)) {
      // TODO: 表达式
      return {
        type: "math",
        value: "",
      };
    }
    if (isXML.test(reg)) {
      return {
        type: "XML",
        value: reg,
      };
    }

    return {
      type: "unknown",
      value: reg,
    };
  }

  renderDOM(HTML: string, DOM: HTMLElement) {
    DOM.innerHTML = HTML;
    // TNTValueTagProcessing();
    // TNTTagProcessing();
  }

  evaluate(expression: string): VariableValueType {
    // TODO: evaluate the value
    const value = Globals.symbolTable.getValue(expression.trim());
    if (value.type === StringType && typeof value.value === "string") {
      return value.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return value.value;
  }
}
