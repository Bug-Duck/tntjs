/**
 * file: GlobalEnvironment.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 9:10
 * description: The global environment of the tntjs.
 */

/// <reference path="SymbolTable.ts"/>

namespace TNT {
    export namespace Globals {
        export let symbolTable: SymbolTable = new SymbolTable();
        export let instances: Array<TNT> = [];
        let valueEvaluator: (string) => any = (expr: string) => symbolTable.getValue(expr.trim()).value
        export function setValueEvaluator(fn: (string) => any) {
            valueEvaluator = fn;
        }
        export function evaluate(expr: string): any {
            return valueEvaluator(expr);
        }
    }
}
