
namespace TemplateLanguage {
    export class Template {
        Plugin (name: string, func: () => void) {
            this[name] = func;
        }

        httpGet(dom) {
            const http = new XMLHttpRequest();
            dom.innerHTML = http.open("GET", dom.innerHTML, true);
        }
    
        httpPost(dom) {
            const http = new XMLHttpRequest();
            dom.innerHTML = http.open("POST", dom.innerHTML, true);
        }

        forCodes(dom) {
            const HTMLCodes = dom.innerHTML;
            let IterationValue;
            let IterationName;
            let IterationObject;
            IterationObject.forEach((iter,key) => {
                TNT.Globals.symbolTable.setValue(IterationName,new TNT.Variable(iter,TNT.ObjectType));
                //TODO: 渲染列表
            });
        }

        ifCodes(dom) {
            const HTMLCodes = dom.innerHTML;
            const be: Array<string> = [];
            switch (be[1]) {
            case "equals":
                if (be[0] === be[1]) {}
                break;
            case "unequls":
                if (be[0] !== be[2]) {}
                break;
            }
        }
    }
}

