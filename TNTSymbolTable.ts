
let TNTSymbolTable = {
    PI: 3.14159265,
    test: 2333,
    print: function (x) {
        console.log(x);
    },
    explorerType: TNTGetBrowserType(),
    ebyid: function (id, iHTML) {
        document.getElementById(id).innerHTML = iHTML;
    },
    sleep: function (x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(null);
            }, x);
        });
    }
};
