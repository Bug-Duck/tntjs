namespace TNT {
    export class DataRenderer {
        private prv_tagDataAttributes: NodeListOf<Element>;
        tagDataRender() {
            this.prv_tagDataAttributes = document.querySelectorAll("[tnt-td]");
            const domData = [];
            for (const i of this.prv_tagDataAttributes) {
                const text = i.getAttribute("tnt-td");
                const data = this.Analysis(text);
                domData.push([i, data]);
            }
            Globals.symbolTable.onSetValue(() => {
                for (const i of domData) {
                    for (const d of i[1]) {
                        i[0][d] = i[1][d];
                    }
                }
            });
        }

        tagStyleRender() {
            this.prv_tagDataAttributes = document.querySelectorAll("[tnt-sd]");
            const domData = [];
            for (const i of this.prv_tagDataAttributes) {
                const text = i.getAttribute("tnt-sd");
                const data = this.Analysis(text);
                domData.push([i, data]);
            }
            Globals.symbolTable.onSetValue(() => {
                for (const i of domData) {
                    for (const d of i[1]) {
                        i[0].style[d] = i[1][d];
                    }
                }
            });
        }

        Analysis(t: string): any {
            let word: string;
            let keyword: string;
            const words: Array<string> = [];
            let keyValue: any;
            let whenKeyWord = false;
            for (const i of t) {
                if (i === ",") {
                    words.push(word);
                    word = "";
                } else {
                    word += i;
                }
            }
            word = "";
            for (const i of words) {
                if (i === ">") {
                    keyValue[keyword.replace(" ", "")] = word.replace(" ", "");
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
            return keyValue;
        }
    }
}