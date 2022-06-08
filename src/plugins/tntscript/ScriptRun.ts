/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * You may think you know what the following code does.
 * But you dont. Trust me.
 * Fiddle with it, and youll spend many a sleepless
 * night cursing the moment you thought youd be clever
 * enough to "optimize" the code below.
 * Now close this file and go play with something else.
 */

import { Globals } from "src/runtime/GlobalEnvironment";
import { SymbolTable } from "src/runtime/SymbolTable";
import { codeSplit, keySearch } from "./lexicalAnalysis";

export function runScriptCode(codes, dataObj): SymbolTable {
  const codeList = init(codes);
  codeList.forEach((code) => {
    lineRun(code);
  });
  return dataObj.innerSymbolTable;
}

export function init(codes: string) {
  const list = codeSplit(codes);
  return list;
}

export function lineRun(code: string) {
  // TODO: refactor those keywords into an array
  const isKeyword = /(for|while|def|render|when) .+/;
  if (/([A-z0-9])+ ?= ?.+/.test(code)) { // Variable assignment statement
    variableStatement(code, this);
    return;
  }
  if (isKeyword.test(code)) {
    if (/render/.test(code)) {
      renderStatement(code, this);
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
    this.ValueProcess(code);
  }
}
    
export function variableStatement (code: string, dataObj) {
  const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(" "));
  const process = dataObj.ValueProcess(v[0]);
  // TODO: 变量赋值的值重构后存储
  if (/let /.test(code)) {
    // TODO:局部变量赋值
    // const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(" "));
    // newData(
    //     process.type,
    //     name[0],
    //     process.value,
    //     TNTSymbolTableOWN,
    // );
  } else {
    Globals.symbolTable.setValue(process.type, process.value);
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
  // TODO: 这里类型监测出了点问题，因此注释
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
  // TODO: fix this merge
  Globals.symbolTable.merge(newTable, (oldValue, _newValue) => oldValue);
};
