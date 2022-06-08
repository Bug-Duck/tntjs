namespace TNTScript {

    // This function splits code with ";"
    export function codeSplit(code: string) {
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
          if (i === "\\") {
            // Escaping characters
            stringIgnoreNext = true;
            continue;
          }
          if (i === "\"" && !stringIgnoreNext) {
            // End the string.
            ignoreNext = false;
          }
          if (stringIgnoreNext) {
            stringIgnoreNext = false;
          }
          continue;
        } else {
          if (i === ";") {
            buffer.push(currentString);
            currentString = "";
          } else if (i === "\"") {
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

    export function codeBlock(code) {
      const v: string = code.replace(/\{.+\}/, "");
      const codes: string = /\{.+\}/.exec(code)[0];
      return [v, codeSplit(codes.substring(1,codes.length - 1))];
    }

    export function keySearch(key: string,code: string) {
      return code.replace(new RegExp(`${key} `), "");
    }

    export function functionSplit(code: string, original = false) {
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
          if (i === "}") {
            bracketMatchingStack.pop();
            if (bracketMatchingStack.length === 0) {
              buffer.push(currentString + "}");
              bracketMatchingMode = false;
              continue;
            }
          } else if (i === "{") {
            bracketMatchingStack.push(null);
          }
          continue;
        }
        // Next will be ignored (In this case, means in a string.)
        if (ignoreNext) {
          // Add the current char to the string.
          currentString += i;
          if (i === "\\") {
            // Escaping characters
            stringIgnoreNext = true;
            continue;
          }
          if (i === "\"" && !stringIgnoreNext) {
            // End the string.
            ignoreNext = false;
          }
          if (stringIgnoreNext) {
            stringIgnoreNext = false;
          }
          continue;
        } else {
          if (i === ",") {
            buffer.push(currentString.trim());
            currentString = "";
          } else if (i === "\"") {
            currentString += i;
            ignoreNext = true;
          } else if (i === "{") {
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
          const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(" "));
          const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(" "));
          values.functioncanvalue[name[0]] = new ScriptExecutor().ValueProcess(v[0]);
        } else {
          values.agv.push(original ? new ScriptExecutor().ValueProcess(value) : value);
        }
      }
      return values;
    }

    export function jsTypeToTNTType(TypeName: string): string {
      return ({
        "String": "string",
        "Number": "number",
        "Boolean": "bool",
      })[TypeName];
    }
}