namespace TNT {
let TNTSymbolTable = {
    PI: {
        type: 'number',
        value: 3.14159265,
    },
    test: {
        type: 'number',
        value: 2333
    },
    print: {
        type: 'function',
        value: function (x) {
            console.log(x);
        },
    },
    explorerType: {
        type:'string',
        value: TNTGetBrowserType(),
    },
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
}
