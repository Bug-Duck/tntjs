namespace TNT {
    export class DataRenderer {
        TagDataAttributes: NodeListOf<Element>;
        TagDataRender() {
            this.TagDataAttributes = document.querySelectorAll("[tnt-td]");
            const domData = [];
            for (const i of this.TagDataAttributes) {
                const text = i.getAttribute('tnt-td');
                const data = this.Analysis(text);
                domData.push([i,data]);
            }
            Globals.symbolTable.onSetValue(() => {
                for (const i of domData) {
                    for (const d of i[1]) {
                        i[0][d] = i[1][d];
                    }
                }
            })
        }

        TagStyleRender() {
            this.TagDataAttributes = document.querySelectorAll("[tnt-sd]");
            const domData = [];
            for (const i of this.TagDataAttributes) {
                const text = i.getAttribute('tnt-sd');
                const data = this.Analysis(text);
                domData.push([i,data]);
            }
            Globals.symbolTable.onSetValue(() => {
                for (const i of domData) {
                    for (const d of i[1]) {
                        i[0].style[d] = i[1][d];
                    }
                }
            })
        }

        Analysis(t: string): Object {
            let word: string;
            let keyword: string;
            const words: Array<string> = [];
            let KeyValue: Object;
            let whenKeyWord: boolean = false;
            for (const i of t) {
                if (i === ',') {
                    words.push(word);
                    word = "";
                } else {
                    word += i;
                }
            }
            word = "";
            for (const i of words) {
                if (i === '>') {
                    KeyValue[keyword.replace(' ', '')] = word.replace(' ', '');
                    keyword = "";
                    word = "";
                    whenKeyWord = false;
                } else {
                    if (whenKeyWord) {
                        keyword += i;
                    } else {
                        word += i;
                    }
                }
            }
            return KeyValue;
        }
    }
}