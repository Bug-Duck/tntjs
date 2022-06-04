namespace TemplateLanguage {
    export function tpfor(dom) {
        const HTMLCodes = dom.innerHTML;
        let IterationValue;
        let IterationName;
        let IterationObject;
        IterationObject.forEach((iter,key) => {
            TNT.Globals.symbolTable.setValue(IterationName,new TNT.Variable(iter,TNT.ObjectType));
            //TODO: 渲染列表
        });
    }
}