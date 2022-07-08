import { Variable, StringType } from '../../runtime/SymbolTable.js';
import { codeSplit, keySearch } from './LexicalAnalysis.js';

function runScriptCode(symbolTable, codes, dataObj) {
    const codeList = init(codes);
    codeList.forEach((code) => {
        lineRun(symbolTable, code, dataObj);
    });
    return dataObj.innerSymbolTable;
}
function init(codes) {
    const list = codeSplit(codes);
    return list;
}
function lineRun(symbolTable, code, dataObj) {
    const keywords = ["for", "while", "def", "render", "when"];
    let keywordConstructor = "";
    keywords.forEach((keyword) => {
        keywordConstructor += `${keyword}|`;
    });
    keywordConstructor = keywordConstructor.substring(0, keywordConstructor.length - 1) + " .+";
    const isKeyword = RegExp(keywordConstructor);
    if (/([A-z0-9])+ ?= ?.+/.test(code)) {
        variableStatement(symbolTable, code, dataObj);
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
        dataObj.processValue(symbolTable, code);
    }
}
function variableStatement(symbolTable, code, dataObj) {
    const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(" "));
    const process = dataObj.processValue(symbolTable, v[0]);
    if (/let /.test(code)) {
    }
    else {
        symbolTable.setValue(process.type, new Variable(process.value, StringType));
    }
}
const renderStatement = (code, dataObj) => {
};
function whileStatement(code) {
}
const importCode = (symbolTable, code, dataObj) => {
    const importedPackage = dataObj.processValue(keySearch("import", code));
    const http = new XMLHttpRequest();
    const fileCode = http.open("GET", importedPackage, false);
    const newTable = runScriptCode(symbolTable, fileCode, dataObj);
    symbolTable.merge(newTable, (oldValue, _newValue) => oldValue);
};

export { importCode, init, lineRun, renderStatement, runScriptCode, variableStatement, whileStatement };
//# sourceMappingURL=ScriptRun.js.map
