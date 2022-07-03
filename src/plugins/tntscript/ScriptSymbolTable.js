import { SymbolTable } from "runtime/SymbolTable";
export class ScriptSymbolTable extends SymbolTable {
    constructor() {
        super();
    }
    print(text) {
        console.log(text);
    }
    sleep(time, callback = () => { }) {
        setTimeout(callback, time);
    }
    range(startIndex, endIndex) {
        return [...Array(endIndex - startIndex).keys()];
    }
}
export class Globals {
    constructor() {
        this.scriptSymbolTable = new ScriptSymbolTable();
    }
}
//# sourceMappingURL=ScriptSymbolTable.js.map