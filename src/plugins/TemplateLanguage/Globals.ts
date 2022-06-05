
namespace TemplateLanguage {
    export namespace Globals {
        export const templateSymbol = new TemplateLanguage.Template();
        // export const templateSymbol: Component = new Object();
        export const addComponents = (compon: Component) => {
            templateSymbol[compon.name] = compon.exec;
        };
        export const render = (dom) => {
            for (const component in templateSymbol) {
                const componentDocument = document.getElementsByTagName(component);

            }
        };

        addComponents(new Component("get", (dom) => {
            const http = new XMLHttpRequest();
            dom.innerHTML = http.open("GET", dom.innerHTML, true);
        }));
        addComponents(new Component("post", (dom) => {
            const http = new XMLHttpRequest();
            dom.innerHTML = http.open("POST", dom.innerHTML, true);
        }));
        addComponents(new Component("if", (dom, 
            comparisonValue,
            condition,
            valueBeingCompared
        ) => {
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
        }));
        addComponents(new Component("for", (dom, 
            traversalBody,
            way,
            iterateOverObject,
        ) => {
            const HTMLCodes = dom.innerHTML;
            iterateOverObject.forEach((iter,key) => {
                TNT.Globals.symbolTable.setValue(traversalBody,new TNT.Variable(iter,TNT.ObjectType));
                //TODO: 渲染列表
            });
        }));
        // addComponents(new Component());
    }
}