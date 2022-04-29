namespace TNT {

    export function TNTFunctionSplit(code: string, original: boolean = false) {
        let ignoreNext = false;
        let stringIgnoreNext = false;
        let bracketMatchingMode = false;
        let bracketMatchingStack = [];
        const buffer = [];
        let currentString = "";
        // Iterate every charaters in the code
        for (const i of code) {
            // Bracket Matching Mode
            if (bracketMatchingMode) {
                currentString += i;
                if (i === '}') {
                    bracketMatchingStack.pop();
                    if (bracketMatchingStack.length === 0) {
                        buffer.push(currentString + "}");
                        bracketMatchingMode = false;
                        continue;
                    }
                } else if (i === '{') {
                    bracketMatchingStack.push(null);
                }
                continue;
            }
            // Next will be ignored (In this case, means in a string.)
            if (ignoreNext) {
                // Add the current char to the string.
                currentString += i;
                if (i === '\\') {
                    // Escaping characters
                    stringIgnoreNext = true;
                    continue;
                }
                if (i === '"' && !stringIgnoreNext) {
                    // End the string.
                    ignoreNext = false;
                }
                if (stringIgnoreNext) {
                    stringIgnoreNext = false;
                }
                continue;
            } else {
                if (i === ',') {
                    buffer.push(currentString.trim());
                    currentString = "";
                } else if (i === '"') {
                    currentString += i;
                    ignoreNext = true;
                } else if (i === '{') {
                    // Right bracket
                    bracketMatchingMode = true;
                    bracketMatchingStack = [null];
                    currentString += i;
                } else {
                    currentString += i;
                }
            }
        }
        if (currentString !== "") {
            buffer.push(currentString.trim());
            currentString = "";
        }
        const values = { agv: [], functioncanvalue: {} };
        for (const value of buffer) {
            if (/.+ ?= ?.+/.test(value)) {
                const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(' '));
                const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(' '));
                values.functioncanvalue[name[0]] = TNTValueProcess(v[0]);
            } else {
                if (original) {
                    values.agv.push(TNTValueProcess(value));
                } else {
                    values.agv.push(value)
                }
            }
        }
        return values;
    }

    // This function is very important to def a TNT.js's function!
    export function TNTDefineFunction(func_data: string, In_data: string[]) {
        const name = /[^\(.+\)]+/.exec(func_data)[0].replace(/\s*/g, "");
        let __parameters__ = /\(.+\)/.exec(func_data);
        let __parameter__ = __parameters__[0];
        __parameter__ = __parameter__.substring(1, __parameter__.length - 1);
        TNTSymbolTable[name] = {
            type: "tnt",
            parameter: TNTFunctionSplit(__parameter__, true),
            canparameter: TNTFunctionSplit(__parameter__).functioncanvalue,
            code: In_data
        }
    }

    // This function splits code with ";"
    export function TNTCodeSplit(code: string) {
        let ignoreNext = false;
        let stringIgnoreNext = false;
        const buffer = [];
        let currentString = "";
        // Iterate every charaters in the code
        for (const i of code) {
            // Next will be ignored (In this case, means in a string.)
            if (ignoreNext) {
                // Add the current char to the string.
                currentString += i;
                if (i === '\\') {
                    // Escaping characters
                    stringIgnoreNext = true;
                    continue;
                }
                if (i === '"' && !stringIgnoreNext) {
                    // End the string.
                    ignoreNext = false;
                }
                if (stringIgnoreNext) {
                    stringIgnoreNext = false;
                }
                continue;
            } else {
                if (i === ';') {
                    buffer.push(currentString);
                    currentString = "";
                } else if (i === '"') {
                    currentString += i;
                    ignoreNext = true;
                } else {
                    currentString += i;
                }
            }
        }
        if (currentString !== "") {
            buffer.push(currentString);
            currentString = "";
        }
        return buffer;
    }

    

}