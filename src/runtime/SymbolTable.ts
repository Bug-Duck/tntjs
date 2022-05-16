/**
 * file: Symbol.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 8:47
 * description: The main symbol table.
 */

/// <reference path="TypeInfo.ts"/>

namespace TNT {
    // The types
    export const StringType = new TypeInfo("tnt", "string");
    export const NumberType = new TypeInfo("tnt", "number");
    export const ObjectType = new TypeInfo("tnt", "object");
    export const TNTFunctionType = new TypeInfo("tnt", "function");
    export const JSFunctionType = new TypeInfo("js", "function");
    export const HTMLStringType = new TypeInfo("tnt", "html_string");

    // A variable.
    export class Variable {
        private prv_value: any;
        private prv_type: TypeInfo;
        // The default constructor.
        constructor(value: any, type: TypeInfo) {
            this.prv_validate(value, type);
            this.prv_value = value;
            this.prv_type = type;
        }
        private prv_validate(value: any, type: TypeInfo) {
            if (type === StringType && typeof (value) !== "string") {
                throw new TypeError("value should ba a string.")
            }
            if (type === HTMLStringType && typeof (value) !== "string") {
                throw new TypeError("value should ba a string.")
            }
            if (type === NumberType && typeof (value) !== "number") {
                throw new TypeError("value should ba a number.")
            }
            if (type === JSFunctionType && typeof (value) !== "function") {
                throw new TypeError("value should ba a javascript function.")
            }
        }
        get value() {
            return this.prv_value;
        }
        set value(value: any) {
            this.prv_validate(value, this.prv_type);
            this.prv_value = value;
        }
        get type() {
            return this.prv_type;
        }
    }

    // The symbol table.
    export class SymbolTable {
        private prv_onsetvalue_event_handler: Array<() => void> = [];
        private prv_content: any = {};
        constructor() { }
        // Get the value via the variable name.
        getValue(key: string): Variable {
            return this.prv_content[key];
        }
        // Set the value by the variable name.
        setValue(key: string, v: Variable): void {
            this.prv_content[key] = v;
            for (const i of this.prv_onsetvalue_event_handler) {
                i();
            }
        }
        // Register a new event handler that will be called when the value changes (to automatically update the state).
        onSetValue(handler: () => void) {
            this.prv_onsetvalue_event_handler.push(handler);
        }

        // Get all variables' names.
        get variableNames(): string[] {
            return Object.keys(this.prv_content);
        }

        // Check if contains the variable.
        containsVariable(variableName: string): boolean {
            for (const i of this.variableNames) {
                if (i === variableName) {
                    return true;
                }
            }
            return false;
        }

        // Merge table.
        merge(anotherTable: SymbolTable, ifExists: (oldValue: Variable, newValue: Variable) => Variable): void {
            let herNames = anotherTable.variableNames;
            for (const i of herNames) {
                if (this.containsVariable(i)) {
                    // Exists
                    this.setValue(i, ifExists(this.getValue(i), anotherTable.getValue(i)));
                } else {
                    // New variable
                    this.setValue(i, anotherTable.getValue(i));
                }
            }
        }
    }
}
