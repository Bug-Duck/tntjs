import { SymbolTable } from '../../runtime/SymbolTable.js';

class ScriptSymbolTable extends SymbolTable {
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
class Globals {
    constructor() {
        this.scriptSymbolTable = new ScriptSymbolTable();
    }
}

export { Globals, ScriptSymbolTable };
//# sourceMappingURL=ScriptSymbolTable.js.map
