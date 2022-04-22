let TNTSymbolTable = {
    PI: 3.14159265,
    test: {
        type: 'number',
        value: 2333
    },
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

function JsTypeToTNTType(TypeName) {
    switch (TypeName) {
        case "String":
            return 'string';
            break;
        case "Number":
            return 'number';
            break;
        case "Boolean":
            return 'bool';
            break;
        default:
            break;
    }
}

function newData(
    type: (
        'string' | 'number' | 'tnt' | 'boolean' | 'function'
),
    name: string,
    value: any,
    datahouse: {},
) {
    datahouse[name] = {
        type: type,
        value: value,
    }
}
