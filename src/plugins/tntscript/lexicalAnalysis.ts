import { SymbolTable } from "runtime/SymbolTable";
import { ProcessValueType } from "./ScriptExecutor";
import { ScriptExecutor } from "./ScriptExecutor";

export enum Tokens {
  STRING_ESCAPE = "\\",
  STRING_START = "\"",
  STRING_END = "\"",
  LINE_SEPARATOR = ";",
  LEFT_BRACKET = "{",
  RIGHT_BRACKET = "}",
  COMMA = ",",
}

export interface FunctionParameterType {
  args: ProcessValueType[];
  optionalArgs: Record<string, ProcessValueType>;
}

// This function splits code with ";"
export function codeSplit(code: string): string[] {
  let isInString = false;
  let isStringEscape = false;
  const buffer: string[] = [];
  let currentLine = "";
  [...code].forEach((char) => {
    if (isInString) {
      currentLine += char;
      if (isStringEscape) {
        isStringEscape = false;
        return;
      }
      if (char === Tokens.STRING_ESCAPE) {
        isStringEscape = true;
        return;
      }
      if (char === Tokens.STRING_END) {
        isInString = false;
      }
      return;
    }
    if (char === Tokens.LINE_SEPARATOR) {
      buffer.push(currentLine);
      currentLine = "";
      return;
    }
    if (char === Tokens.STRING_START) {
      currentLine += char;
      isInString = true;
      return;
    }
    currentLine += char;
  });
  if (currentLine !== "") {
    buffer.push(currentLine);
  }
  return buffer;
}

export function codeBlock(code: string) {
  const codeBlockRegex = /\{.+\}/;
  const v = code.replace(codeBlockRegex, "");
  const codes = code.match(codeBlockRegex)[0];
  return [v, this.codeSplit(codes.substring(1, codes.length - 1))];
}

export function keySearch(key: string, code: string) {
  return code.replace(key, "");
}

export function functionSplit(symbolTable: SymbolTable, code: string, original = false): FunctionParameterType {
  let isInString = false;
  let isStringEscape = false;
  let isBracketMatchingMode = false;
  let bracketMatchingStack = [];
  const buffer = [];
  let currentString = "";
  [...code].forEach((char) => {
    if (isBracketMatchingMode) {
      currentString += char;
      if (char === Tokens.LEFT_BRACKET) {
        bracketMatchingStack.push(null);
        return;
      }
      if (char === Tokens.RIGHT_BRACKET) {
        bracketMatchingStack.pop();
        if (bracketMatchingStack.length > 0) return;
        buffer.push(currentString + Tokens.RIGHT_BRACKET);
        isBracketMatchingMode = false;
      }
      return;
    }
    if (isInString) {
      currentString += char;
      if (isStringEscape) {
        isStringEscape = false;
        return;
      }
      if (char === Tokens.STRING_ESCAPE) {
        isStringEscape = true;
        return;
      }
      if (char === Tokens.STRING_END) {
        isInString = false;
      }
      return;
    }
    if (char === Tokens.COMMA) {
      buffer.push(currentString.trim());
      currentString = "";
      return;
    }
    if (char === Tokens.STRING_ESCAPE) {
      currentString += char;
      isInString = true;
      return;
    }
    if (char === Tokens.LEFT_BRACKET) {
      // Right bracket
      isBracketMatchingMode = true;
      bracketMatchingStack = [null];
      currentString += char;
      return;
    }
    currentString += char;
  });

  if (currentString !== "") {
    buffer.push(currentString.trim());
  }

  const values: FunctionParameterType = { args: [], optionalArgs: {} };
  buffer.forEach((value) => {
    if (/.+ ?= ?.+/.test(value)) {
      const v = /[^= ]+/.exec(/= ?.+/.exec(code).join(" "));
      const name = /[^? =]/.exec(/([A-z0-9])+ ?=/.exec(code).join(" "));
      values.optionalArgs[name[0]] = new ScriptExecutor().processValue(symbolTable, v[0]);
      return;
    }
    values.args.push(original ? new ScriptExecutor().processValue(symbolTable, value) : value);
  });

  return values;
}


export function jsTypeToTNTType(TypeName: string): string {
  return ({
    "String": "string",
    "Number": "number",
    "Boolean": "bool",
  })[TypeName];
}
