namespace TNT {
    export class TNTError {
        dom: HTMLElement;
        line: number;
        constructor(selfdom) {
            this.dom = document.getElementById(selfdom);
            this.line = 1;
        }

        VarNotFound(name) {
            this.dom.innerHTML = `TNTError: '${name}' is not found <line ${this.line}>`
        }

        notAFunction(name) {
            this.dom.innerHTML = `TNTError: '${name}' is not a function  <line ${this.line}>`
        }
    }
}