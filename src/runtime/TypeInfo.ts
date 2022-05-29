/**
 * file: TypeInfo.ts
 * creator: 27Onion
 * create time: May 8th, 2022, 18:00
 * description: The type class.
 */

namespace TNT {
    export class TypeInfo {
        private prv_namespaceName: string;
        private prv_typeName: string;
        private prv_defaultValue: any;
        constructor(namespaceName: string, typeName: string, defaultValue: any) {
            this.prv_namespaceName = namespaceName;
            this.prv_typeName = typeName;
            this.prv_defaultValue = defaultValue;
        }
        toString(): string {
            return `${this.prv_namespaceName}:type.${this.prv_typeName}`
        }
        get name(): string {
            return this.prv_typeName;
        }
        get owner(): string {
            return this.prv_typeName;
        }
        get defaultValue(): any {
            return this.prv_defaultValue;
        }
    }
}
