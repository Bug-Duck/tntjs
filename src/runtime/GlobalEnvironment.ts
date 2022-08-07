/**
 * The global environment of the tntjs.
 */

import { JSFunctionType, SymbolTable, VariableValueType } from "./SymbolTable";
import TNT from "./TNT";

/**
 * The instances of TNT runtimes.
 */
export const TNTInstances: TNT[] = [];

/**
 * The evaluated result.
 */
export interface EvaluateResult {
  value: VariableValueType;
  expr: string;
}

/**
 * A function that evaluates the given expression and give out the result.
 */
export let valueEvaluator: (symbolTable: SymbolTable, expr: string) => EvaluateResult;

/**
 * Message to display when failed to evaluate the given expression.
 */
export const valueEvaluationFailedMessage = "[TNT_RENDER_ERROR]";

/**
 * The default value evaluator. If the `valueEvaluator` is not provided, this will be used.
 */
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

/**
 * Set a new evaluator for the current runtime. 
 * @param {(symbolTable: SymbolTable, epxr: String) => EvaluateResult} newEvaluator The new evaluator.
 */
export const setValueEvaluator = (newEvaluator: (symbolTable: SymbolTable, expr: string) => EvaluateResult) => {
  valueEvaluator = newEvaluator;
};

/**
 * Evaluate an tntjs expression.
 * @param {SymbolTable} symbolTable The symbol table to use as the context of the expression.
 * @param {expr} expr The expression.
 * @param {string[]} ignoreVariables Variables to ignore. Defaults to `[]`.
 * @param {boolean} dontEval Determine if the evaluate action will be actually performed.
 * @returns 
 */
export const evaluate = (symbolTable: SymbolTable, expr: string, ignoreVariables: string[] = [], dontEval = false): EvaluateResult => {
  return (valueEvaluator ?? defaultValueEvaluator)(symbolTable, expr, ignoreVariables, dontEval);
};
