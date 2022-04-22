declare namespace TNT {
    function setVtagContent(vTag: HTMLUnknownElement, newValue: string): void;
}
declare let TNTSymbolTable: {
    PI: number;
    test: {
        type: string;
        value: number;
    };
    print: (x: any) => void;
    explorerType: string;
    ebyid: (id: any, iHTML: any) => void;
    sleep: (x: any) => Promise<unknown>;
};
declare function JsTypeToTNTType(TypeName: any): "string" | "number" | "bool";
declare function newData(type: ('string' | 'number' | 'tnt' | 'boolean' | 'function'), name: string, value: any, datahouse: {}): void;
declare function TNTMatchStartSymbol(startSymbol: any, endSymbol: any, data: any, startIndex: any): any;
declare function TNTValueProcess(reg: string): any;
declare function TNTBoom(codeList: string[], data?: any, isinclass?: boolean): any;
declare function TNTFunctionSplit(code: string, original?: boolean): {
    agv: any[];
    functioncanvalue: {};
};
declare function def(func_data: string, In_data: string[]): void;
declare function render(HTML: string, DOM: any): void;
declare function TNTCodeSplit(code: string): any[];
declare function TNTValueTagProcessing(): void;
declare function TNTValueTagValueRenderer(tagValue: any): any;
declare function TNTTagProcessing(): void;
declare function TNTGetBrowserType(): string;
