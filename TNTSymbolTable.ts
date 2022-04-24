namespace TNT {
    export let TNTSymbolTable = {
        PI: {
            type: 'number',
            value: 3.14159265,
        } as TNTData,
        test: {
            type: 'number',
            value: 2333
        } as TNTData,
        print: {
            type: 'function',
            value: function (x) {
                console.log(x);
            },
        } as TNTData
    };

    export function JsTypeToTNTType(TypeName) {
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

    export function newData(
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
    export interface TNTData {
        type: string;
        value: any;
    }
}
