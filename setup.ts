
window.onload = () => {
    TNTValueTagProcessing();
    TNTTagProcessing();
    setTimeout(() => {
        TNTSymbolTable["test"] = 114514;
        TNTValueTagProcessing();
    }, 1000);
}