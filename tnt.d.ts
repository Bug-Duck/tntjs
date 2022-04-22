declare namespace TNT {
    function setVtagContent(vTag: HTMLUnknownElement, newValue: string): void;
}
declare let TNTSymbolTable: {
    PI: number;
    test: number;
    print: (x: any) => void;
    explorerType: string;
    ebyid: (id: any, iHTML: any) => void;
    sleep: (x: any) => Promise<unknown>;
};
declare function TNTMatchStartSymbol(startSymbol: any, endSymbol: any, data: any, startIndex: any): any;
declare function TNTValueProcess(reg: any): any;
declare function TNTBoom(codeList: any, data?: any, isinclass?: boolean): any;
declare function TNTFunctionSplit(code: any, original?: boolean): {
    agv: any[];
    functioncanvalue: {};
};
declare function def(func_data: any, In_data: any): void;
declare function render(HTML: any, DOM: any): void;
declare function TNTCodeSplit(code: any): any[];
declare function TNTValueTagProcessing(): void;
declare function TNTValueTagValueRenderer(tagValue: any): any;
declare function TNTTagProcessing(): void;
declare function TNTGetBrowserType(): string;
