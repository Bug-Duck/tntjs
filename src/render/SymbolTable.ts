/**
 * file: Symbol.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 8:47
 * description: The main symbol table.
 */

import { TypeFlags } from "node_modules/typescript/lib/typescript";

namespace TNT {
    export enum Type {
        StringType = "tnt:type.string",
        NumberType = "tnt:type.number",
        ObjectType = "tnt:type.object",
        TNTFunctionType = "tnt:type.function",
        JSFunctionType = "js:type.function",
    }
    export class Variable {
        private prv_value: any;
        private prv_type: Type;
        // The default constructor.
        constructor(value: any, type: Type) {
            this.prv_validate(value, type);
            this.prv_value = value;
            this.prv_type = type;
        }
        private prv_validate(value: any, type: Type) {
            if (type === Type.StringType && typeof(value) !== "string") {
                throw new TypeError("value should ba a string.")
            }
            if (type === Type.NumberType && typeof(value) !== "number") {
                throw new TypeError("value should ba a number.")
            }
            if (type === Type.JSFunctionType && typeof(value) !== "function") {
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
    export class SymbolTable {
        constructor() {}
    }
}