namespace TNTState {
    export class Value {
        name: string;
        valueObject: TNT.Variable;
        constructor(name) {
            this.name = name;
            this.valueObject = TNT.Globals.symbolTable.getValue(this.name)
        }

        setValue(value) {
            TNT.Globals.symbolTable.setValue(this.name, value)
        }

        get vlaue() {
            return this.valueObject.value;
        }

        get type() {
            return this.valueObject.type;
        }
    }
}