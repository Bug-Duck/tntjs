import { Globals } from "runtime/GlobalEnvironment";
import { StringType } from "runtime/SymbolTable";
import { codeSplit, keySearch } from "./LexicalAnalysis";
import { Variable } from "runtime/SymbolTable";
export function runScriptCode(codes, dataObj) {
    const codeList = init(codes);
    codeList.forEach((code) => {
        lineRun(code, dataObj);
    });
    return dataObj.innerSymbolTable;
}
export function init(codes) {
    const list = codeSplit(codes);
    return list;
}
export function lineRun(code, dataObj) {
    const keywords = ["for", "while", "def", "render", "when"];
    let keywordConstructor = "";
    keywords.forEach((keyword) => {
        keywordConstructor += `${keyword}|`;
    });
    keywordConstructor = keywordConstructor.substring(0, keywordConstructor.length - 1) + " .+";
    const isKeyword = RegExp(keywordConstructor);
    if (/([A-z0-9])+ ?= ?.+/.test(code)) {
        variableStatement(code, dataObj);
        return;
    }
    if (isKeyword.test(code)) {
        if (/render/.test(code)) {
            renderStatement(code, dataObj);
        }
        else if (/while/.test(code)) {
            whileStatement(code);
        }
        else if (/def/.test(code)) {
        }
        else if (/for/.test(code)) {
        }
        return;
    }
    if (code === "break") {
        return "break";
    }
    else {
        dataObj.processValue(code);
    }
}
export function variableStatement(code, dataObj) {
    const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(" "));
    const process = dataObj.processValue(v[0]);
    if (/let /.test(code)) {
    }
    else {
        Globals.symbolTable.setValue(process.type, new Variable(process.value, StringType));
    }
}
export const renderStatement = (code, dataObj) => {
};
export function whileStatement(code) {
}
export const importCode = (code, dataObj) => {
    const importedPackage = dataObj.processValue(keySearch("import", code));
    const http = new XMLHttpRequest();
    const fileCode = http.open("GET", importedPackage, false);
    const newTable = runScriptCode(fileCode, dataObj);
    Globals.symbolTable.merge(newTable, (oldValue, _newValue) => oldValue);
};
//# sourceMappingURL=ScriptRun.js.map