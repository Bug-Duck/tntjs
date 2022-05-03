window.onload = () => {
    TNT.TNTSymbolTable["explorerType"] = {
        type: 'string',
        value: TNT.TNTGetBrowserType(),
    } as TNT.TNTData;
    TNT.TNTTagProcessing();
    TNT.TNTValueTagProcessing();
    setTimeout(() => {
        TNT.TNTSymbolTable["test"].value = 114514;
        TNT.TNTValueTagProcessing();
    }, 1000);
}