declare namespace TNT {
    function setVtagContent(vTag: HTMLUnknownElement, newValue: string): void;
}
declare namespace TNT {
    let TNTSymbolTable: {
        PI: {
            type: string;
            value: number;
        };
        test: {
            type: string;
            value: number;
        };
        print: {
            type: string;
            value: (x: any) => void;
        };
    };
    function JsTypeToTNTType(TypeName: any): "string" | "number" | "bool";
    function newData(type: ('string' | 'number' | 'tnt' | 'boolean' | 'function'), name: string, value: any, datahouse: {}): void;
}
declare namespace TNT {
    function TNTValueTagProcessing(): void;
    function TNTTagProcessing(): void;
    function TNTGetBrowserType(): string;
}
