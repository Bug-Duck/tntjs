import { __classPrivateFieldSet, __classPrivateFieldGet } from '../../node_modules/tslib/tslib.es6.js';

var _DataRenderer_tagDataAttributes;
class DataRenderer {
    constructor() {
        _DataRenderer_tagDataAttributes.set(this, void 0);
    }
    tagDataRender() {
        __classPrivateFieldSet(this, _DataRenderer_tagDataAttributes, document.querySelectorAll("[tnt-td]"), "f");
        const domData = [];
        __classPrivateFieldGet(this, _DataRenderer_tagDataAttributes, "f").forEach((tag) => {
            const text = tag.getAttribute("tnt-td");
            const data = this.analysis(text);
            domData.push([tag, data]);
        });
    }
    tagStyleRender() {
        __classPrivateFieldSet(this, _DataRenderer_tagDataAttributes, document.querySelectorAll("[tnt-sd]"), "f");
        const domData = [];
        for (const i of __classPrivateFieldGet(this, _DataRenderer_tagDataAttributes, "f")) {
            const text = i.getAttribute("tnt-sd");
            const data = this.analysis(text);
            domData.push([i, data]);
        }
    }
    analysis(toAnalysis) {
        let word = "", keyword = "";
        const words = [], keyValue = {};
        let whenKeyWord = false;
        [...toAnalysis].forEach((char) => {
            if (char === ",") {
                words.push(word);
                word = "";
            }
            else {
                word += char;
            }
        });
        word = "";
        words.forEach((w) => {
            if (w === ">") {
                keyValue[keyword.replace(" ", "")] = word.replace(" ", "");
                keyword = "";
                word = "";
                whenKeyWord = false;
            }
            else {
                if (whenKeyWord) {
                    keyword += w;
                }
                else {
                    word += w;
                }
            }
        });
        return keyValue;
    }
}
_DataRenderer_tagDataAttributes = new WeakMap();

export { DataRenderer };
//# sourceMappingURL=DataRenderer.js.map
