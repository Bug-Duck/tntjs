/**
 * The TNT script executor.
 */

import { SymbolTable, VariableValueType, StringType } from "runtime/SymbolTable";
import { functionSplit, jsTypeToTNTType, codeSplit, FunctionParameterType } from "./LexicalAnalysis";
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

  exec(symbolTable: SymbolTable, scriptContent: string, data: SymbolTable = new SymbolTable()) {
    this.#innerSymbolTable = data;
    runScriptCode(symbolTable, scriptContent, this);
  }

  getFunctionParameter(symbolTable: SymbolTable, reg: string, expression = /\(.+\)/): FunctionParameterType {
    const functionParametersMatch = reg.match(expression)[0];
    const parameter = functionParametersMatch.substring(1, functionParametersMatch.length - 1);
    return functionSplit(symbolTable, parameter);
  }

  onFunction (symbolTable: SymbolTable, reg: string) {
    const name = /[^(.+)]+/.exec(reg)[0].replace(/\s*/g, "");
    // TODO: Script 类型 type 值
    if (symbolTable.getValue(name)?.value === "function") {
      let buffer = "";
      const parameters = this.getFunctionParameter(symbolTable, reg);

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
    if (symbolTable.getValue(name)?.value === "tnt") {
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

  processValue (symbolTable: SymbolTable, reg: string): ValueType {
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
      this.onFunction(symbolTable, reg);
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
      const results = symbolTable.getValue(reg)?.value;
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

  evaluate(symbolTable: SymbolTable, expression: string): VariableValueType {
    // TODO: evaluate the value
    const value = symbolTable.getValue(expression.trim());
    if (value.type === StringType && typeof value.value === "string") {
      return value.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return value.value;
  }

  get innerSymbolTable() {
    return this.#innerSymbolTable;
  }
}
