/**
 * The data renderer.
 */

/**
 * A class that renders tnt-typed datas.
 */
export class DataRenderer {
  #tagDataAttributes: NodeListOf<Element>;
  #root: HTMLElement;

  /**
   * Construct a data renderer.
   * @param root The root element of the tnt application.
   */
  constructor(root: HTMLElement) {
    this.#root = root;
  }

  /**
   * Render the TNTJs data.
   */
  tagDataRender() {
    this.#tagDataAttributes = this.#root.querySelectorAll("[tnt-td]");
    const domData = [];
    this.#tagDataAttributes.forEach((tag) => {
      const text = tag.getAttribute("tnt-td");
      const data = this.analysis(text);
      domData.push([tag, data]);
    });
    // FIXME: the below code seems useless :(
    // Globals.symbolTable.onSetValue(() => {
    //   for (const i of domData) {
    //     for (const d of i[1]) {
    //       i[0][d] = i[1][d];
    //     }
    //   }
    // });
  }

  /**
   * Render the attributes of tnt-sd elements.
   */
  tagStyleRender() {
    this.#tagDataAttributes = this.#root.querySelectorAll("[tnt-sd]");
    const domData = [];
    for (const i of this.#tagDataAttributes) {
      const text = i.getAttribute("tnt-sd");
      const data = this.analysis(text);
      domData.push([i, data]);
    }
    // FIXME: useless code?
    // Globals.symbolTable.onSetValue(() => {
    //   for (const i of domData) {
    //     for (const d of i[1]) {
    //       i[0].style[d] = i[1][d];
    //     }
    //   }
    // });
  }

  /**
   * Analysis the given statement to a key-value pair.
   * @param toAnalysis The string to analyze.
   * @returns The result of the analysis.
   */
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
