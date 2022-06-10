// FIXME: implement everything and check unused variables

import { Globals } from "runtime/GlobalEnvironment";
import { StringType, SymbolTable } from "runtime/SymbolTable";
import { codeSplit, jsTypeToTNTType, keySearch } from "./lexicalAnalysis";
import { ScriptExecutor } from "./ScriptExecutor";
import { Variable } from "runtime/SymbolTable";

export function runScriptCode(codes, dataObj: ScriptExecutor): SymbolTable {
  const codeList = init(codes);
  codeList.forEach((code) => {
    lineRun(code, dataObj);
  });
  return dataObj.innerSymbolTable;
}

export function init(codes: string) {
  const list = codeSplit(codes);
  return list;
}

export function lineRun(code: string, dataObj: ScriptExecutor) {
  // TODO: refactor those keywords into an array
  const keywords = ["for", "while", "def", "render", "when"];
  let keywordConstructor = "";
  keywords.forEach((keyword) => {
    keywordConstructor += `${keyword}|`;
  });
  keywordConstructor = keywordConstructor.substring(0, keywordConstructor.length - 1) + " .+";
  const isKeyword = RegExp(keywordConstructor);
  if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
    variableStatement(code, dataObj);
    return;
  }
  if (isKeyword.test(code)) {
    if (/render/.test(code)) {
      renderStatement(code, dataObj);
    } else if (/while/.test(code)) {
      whileStatement(code);
    } else if (/def/.test(code)) {
      // TODO: 定义函数语句
    } else if (/for/.test(code)) {
      // TODO: for循环
    }
    return;
  }
  if (code === "break") {
    // 如果检测到跳出循环语句 则返回"break"
    return "break";
  } else {
    dataObj.processValue(code);
  }
}
    
export function variableStatement (code: string, dataObj: ScriptExecutor) {
  const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(" "));
  const process = dataObj.processValue(v[0]);
  // TODO: 变量赋值的值重构后存储
  if (/let /.test(code)) {
    // TODO: 局部变量赋值
    // const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(" "));
    // newData(
    //     process.type,
    //     name[0],
    //     process.value,
    //     TNTSymbolTableOWN,
    // );
  } else {
    Globals.symbolTable.setValue(process.type, new Variable(process.value, StringType));
  }
  // Refresh the page.
  // TNTValueTagProcessing();
}

export const renderStatement = (code: string, dataObj) => {
  // TODO: 渲染render关键字
  // const html = keySearch("render", code);
  // TNTRenderDOM(html, TNTSymbolTableOWN.__selfdom__)
};

export function whileStatement (code: string) {
  // FIXME: 这里类型监测出了点问题，因此注释
  // const i = codeBlock(keySearch("while", code));
  // const condition = i[0];
  // const codes = i[1];
  // 如果TNTBoom函数返回true 即代表识别到跳出语句 则跳出循环
  // while (this.ValueProcess(condition)) {
  //     if (this.exec(codes)) {
  //         break;
  //     }
  // }
}

export const importCode = (code: string, dataObj) => {
  const importedPackage = dataObj.processValue(keySearch("import", code));
  const http = new XMLHttpRequest();
  const fileCode = http.open("GET", importedPackage, false);
  const newTable = runScriptCode(fileCode, dataObj);
  // FIXME: fix this merge
  Globals.symbolTable.merge(newTable, (oldValue, _newValue) => oldValue);
};
