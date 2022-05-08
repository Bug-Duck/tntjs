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
        let valueEvaluator: (expr: string) => any = (expr: string) => symbolTable.getValue(expr.trim()).value

        export function setValueEvaluator(fn: (expr: string) => any) {
            valueEvaluator = fn;
        }

        export function evaluate(expr: string): any {
            return valueEvaluator(expr);
        }

        let prv_pluginList: Array<Plugin> = [];

        // Add the plugin to the registry list.
        export function addPlugin(plugin: Plugin): void {
            prv_pluginList.push(plugin);
        }

        export function plug(plugin: Plugin): void {
            addPlugin(plugin);
        }

        export function getAllPlugins(): Array<Plugin> {
            return prv_pluginList;
        }

        export function removePlugin(pluginId: string): void {
            let counter = 0;
            for(const plugin of prv_pluginList) {
                if (plugin.id === pluginId) {
                    break;
                }
                counter++;
            }
            prv_pluginList = prv_pluginList.slice(0, counter).concat(prv_pluginList.slice(counter + 1));
        }

    }
}
