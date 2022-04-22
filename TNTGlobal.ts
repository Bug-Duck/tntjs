namespace TNT {
    // An API to edit the content of V tag correctly.
    export function setVtagContent(vTag: HTMLUnknownElement, newValue: string) {
        if (vTag.tagName !== "V" || typeof (newValue) !== "string") {
            throw new Error("vTag should be a V html element.");
        }
        if (vTag.getAttribute("data-rendered") === null) {
            vTag.innerHTML = newValue;
        } else {
            vTag.setAttribute("data-v-content", newValue);
        }
        TNTValueTagProcessing();
    }
}