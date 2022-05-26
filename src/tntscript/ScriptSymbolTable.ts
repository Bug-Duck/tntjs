namespace TNTScript {
    export class ScriptSymbolTable extends TNT.SymbolTable {
        print: (text: any) => void;
        sleep: (time: number) => void;
        range: (endIndex: number ,startIndex?: number) => any;
        constructor() {
            super();
            this.print = (text: string) => {
                console.log(text)
            };
            this.sleep = (time: number) => {
                setTimeout(
                    () => {},
                    time * 1000
                )
            };
            this.range = (startIndex: number = 0,endIndex: number) => {
                const result: Array<number> = []
                let i = startIndex;
                while (i == endIndex) {
                    result.push(i)
                    i += 1;
                };
                return result
            }
        }
    }

    export namespace Globals {
        export let scriptsymboltable = new ScriptSymbolTable()
    }
}