/**
 * The data renderer.
 */

export class DataRenderer {
  #tagDataAttributes: NodeListOf<Element>;
  tagDataRender() {
    this.#tagDataAttributes = document.querySelectorAll("[tnt-td]");
    const domData = [];
    this.#tagDataAttributes.forEach((tag) => {
      const text = tag.getAttribute("tnt-td");
      const data = this.analysis(text);
      domData.push([tag, data]);
    });
    // TODO: the below code seems useless :(
    // Globals.symbolTable.onSetValue(() => {
    //   for (const i of domData) {
    //     for (const d of i[1]) {
    //       i[0][d] = i[1][d];
    //     }
    //   }
    // });
  }

  tagStyleRender() {
    this.#tagDataAttributes = document.querySelectorAll("[tnt-sd]");
    const domData = [];
    for (const i of this.#tagDataAttributes) {
      const text = i.getAttribute("tnt-sd");
      const data = this.analysis(text);
      domData.push([i, data]);
    }
    // TODO: useless code?
    // Globals.symbolTable.onSetValue(() => {
    //   for (const i of domData) {
    //     for (const d of i[1]) {
    //       i[0].style[d] = i[1][d];
    //     }
    //   }
    // });
  }

  analysis(toAnalysis: string): Record<string, string> {
    let word = "", keyword = "";
    const words: string[] = [], keyValue: Record<string, string> = {};
    let whenKeyWord = false;
    [...toAnalysis].forEach((char) => {
      if (char === ",") {
        words.push(word);
        word = "";
      } else {
        word += char;
      }
    });
    word = ""; //word = ""
    words.forEach((w) => {
      if (w === ">") {
        keyValue[keyword.replace(" ", "")] = word.replace(" ", "");
        keyword = "";
        word = "";
        whenKeyWord = false;
      } else {
        if (whenKeyWord) {
          keyword += w;
        } else {
          word += w;
        }
      }
    });
    return keyValue;
  }
}
