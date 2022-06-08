/**
 * You may think you know what the following code does.
 * But you dont. Trust me.
 * Fiddle with it, and youll spend many a sleepless
 * night cursing the moment you thought youd be clever
 * enough to "optimize" the code below.
 * Now close this file and go play with something else.
 */
import { SymbolTable } from "src/runtime/SymbolTable";

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
