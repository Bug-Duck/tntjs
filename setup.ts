window.onload = () => {
    TNT.TNTValueTagProcessing();
    TNT.TNTTagProcessing();
    setTimeout(() => {
        TNT.TNTSymbolTable["test"].value = 114514;
        TNT.TNTValueTagProcessing();
    }, 1000);
}