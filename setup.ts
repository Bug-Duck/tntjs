window.onload = () => {
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
}