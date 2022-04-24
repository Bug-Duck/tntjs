declare namespace TNT {
    function setVtagContent(vTag: HTMLUnknownElement, newValue: string): void;
}
declare namespace TNT {
    let TNTSymbolTable: {
        PI: TNTData;
        test: TNTData;
        print: TNTData;
        explorerType: TNTData;
    };
    function JsTypeToTNTType(TypeName: any): "string" | "number" | "bool";
    function newData(type: ('string' | 'number' | 'tnt' | 'boolean' | 'function'), name: string, value: any, datahouse: {}): void;
    interface TNTData {
        type: string;
        value: any;
    }
}
declare namespace TNT {
    function TNTValueTagProcessing(): void;
    function TNTTagProcessing(): void;
    function TNTGetBrowserType(): string;
}
