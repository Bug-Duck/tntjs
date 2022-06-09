import { SymbolTable } from "runtime/SymbolTable";

export class ScriptSymbolTable extends SymbolTable {
  constructor() {
    super();
  }

  print (text: string) {
    console.log(text);
  }

  sleep (time: number, callback = () => { /**/ }) {
    setTimeout(callback, time);
  }

  range (startIndex: number, endIndex: number): number[] {
    return [...Array(endIndex - startIndex).keys()];
  }
}

export class Globals {
  public scriptSymbolTable = new ScriptSymbolTable();
}
