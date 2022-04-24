window.onload = () => {
<<<<<<< HEAD
    console.log(TNT.TNTSymbolTable);
    TNT.TNTValueTagProcessing();
    TNT.TNTTagProcessing();
=======
    TNT.TNTTagProcessing();
    TNT.TNTValueTagProcessing();
    TNT.TNTSymbolTable["explorerType"] = {
        type: 'string',
        value: TNT.TNTGetBrowserType(),
    } as TNT.TNTData;
    setTimeout(() => {
        TNT.TNTSymbolTable["test"].value = 114514;
        TNT.TNTValueTagProcessing();
    }, 1000);
>>>>>>> 846110d61f7cdec49dec5ff813b5a94f16662eb0
}