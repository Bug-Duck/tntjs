/**
 * The global environment of the tntjs.
 */

import { JSFunctionType, SymbolTable, VariableValueType } from "./SymbolTable";
import TNT from "./TNT";

export const TNTInstances: TNT[] = [];

export interface EvaluateResult {
  value: VariableValueType;
  expr: string;
}

export let valueEvaluator: (symbolTable: SymbolTable, expr: string) => EvaluateResult;

export const valueEvaluationFailedMessage = "[TNT_RENDER_ERROR]";

export const defaultValueEvaluator = (symbolTable: SymbolTable, expr: string, ignoreVariables: string[] = [], dontEval = false): EvaluateResult => {
  let variables = "";
  symbolTable.variableNames.forEach((variableName) => {
    if (ignoreVariables.includes(variableName)) return;
    const variableValue = symbolTable.getValue(variableName);
    variables += `const ${variableName} = ${variableValue.type === JSFunctionType ? variableValue.value : JSON.stringify(variableValue.value)}; `;
  });
  const toEval = `try {${variables}; return ${expr};} catch (e) { return \`${valueEvaluationFailedMessage} \${e}\`; }`;
  variables += expr;
  try {
    return { value: dontEval ? null : Function(toEval)(), expr: variables };
  } catch (e) {
    return { value: e, expr: variables };
  }
};

export const setValueEvaluator = (newEvaluator: (symbolTable: SymbolTable, expr: string) => EvaluateResult) => {
  valueEvaluator = newEvaluator;
};

export const evaluate = (symbolTable: SymbolTable, expr: string, ignoreVariables: string[] = [], dontEval = false): EvaluateResult => {
  return (valueEvaluator ?? defaultValueEvaluator)(symbolTable, expr, ignoreVariables, dontEval);
};
