declare namespace TNTDebug {
    class DebugRenderTracer implements TNT.Renderable {
        render(): void;
    }
}
declare namespace TNT {
    class TypeInfo {
        private prv_namespaceName;
        private prv_typeName;
        private prv_defaultValue;
        constructor(namespaceName: string, typeName: string, defaultValue: any);
        toString(): string;
        get name(): string;
        get owner(): string;
        get defaultValue(): any;
    }
}
declare namespace TNT {
    const StringType: TypeInfo;
    const NumberType: TypeInfo;
    const ObjectType: TypeInfo;
    const TNTFunctionType: TypeInfo;
    const JSFunctionType: TypeInfo;
    const HTMLStringType: TypeInfo;
    const jsTypeToTNT: {
        string: TypeInfo;
        number: TypeInfo;
        object: TypeInfo;
        function: TypeInfo;
    };
    class Variable {
        private prv_value;
        private prv_type;
        constructor(value: any, type: TypeInfo);
        private prv_validate;
        get value(): any;
        set value(value: any);
        get type(): TypeInfo;
    }
    class SymbolTable {
        private prv_onsetvalue_event_handler;
        private prv_content;
        constructor();
        getValue(key: string): Variable;
        setValue(key: string, v: Variable): void;
        onSetValue(handler: () => void): void;
        get variableNames(): string[];
        containsVariable(variableName: string): boolean;
        merge(anotherTable: SymbolTable, ifExists: (oldValue: Variable, newValue: Variable) => Variable): void;
    }
    function jsType2TNT(jsType: string): TypeInfo;
}
declare namespace TNT {
    namespace Globals {
        const symbolTable: SymbolTable;
        let instances: Array<TNT>;
        function setValueEvaluator(fn: (expr: string) => any): void;
        function evaluate(expr: string): any;
        function addPlugin(plugin: Plugin): void;
        function plug(plugin: Plugin): void;
        function getAllPlugins(): Array<Plugin>;
        function hasPlugin(pluginId: string): boolean;
        function removePlugin(pluginId: string): void;
    }
}
declare namespace TNTDebug {
    class PluginMain implements TNT.Plugin {
        get id(): string;
        get rendererList(): TNT.Renderable[];
        get tags(): string[];
        get version(): string;
        onInit(): void;
    }
}
declare namespace TNT {
    class DataRenderer {
        TagDataAttributes: NodeListOf<Element>;
        TagDataRender(): void;
        TagStyleRender(): void;
        Analysis(t: string): Object;
    }
}
declare namespace TNT {
    interface Renderable {
        render(): void;
    }
    interface Plugin {
        get id(): string;
        get rendererList(): Array<Renderable>;
        get tags(): Array<string>;
        get version(): string;
        dependencies?: string[];
        onInit(): void;
    }
}
declare namespace TNT {
    class StaticVTagRenderer {
        private prv_firstRendering;
        private customRenderer?;
        constructor(customRenderer?: (vTagContent: string) => string);
        private defaultRenderer;
        render(): void;
    }
}
declare namespace TNT {
    class TNT {
        private prv_vTagRenderer;
        private prv_svTagRenderer;
        private prv_options;
        private prv_isDebug;
        private prv_refreshLock;
        private prv_checkOptionTags;
        constructor();
        render(): void;
        onceRender(): void;
        get vTagRenderer(): VTagRenderer;
    }
}
declare namespace TNT {
    class VTagRenderer {
        private customRenderer?;
        constructor(customRenderer?: (vTagContent: string) => string);
        private defaultRenderer;
        render(): void;
    }
}
declare namespace TNTSimpApi {
    class PluginMain implements TNT.Plugin {
        get id(): string;
        get rendererList(): TNT.Renderable[];
        get tags(): string[];
        get version(): string;
        onInit(): void;
    }
    class Value {
        name: string;
        valueObject: TNT.Variable;
        constructor(name: string, type: TNT.TypeInfo);
        setValue(value: any): Value;
        get value(): any;
        get type(): TNT.TypeInfo;
    }
}
declare namespace TNTScript {
    type value = {
        type: string;
        value: any;
    };
    export class ScriptExecutor {
        SymbolTableOWN: TNT.SymbolTable;
        exec(scriptContent: string, data?: TNT.SymbolTable): void;
        ValueProcess(reg: string): value;
        renderDOM(HTML: string, DOM: HTMLElement): void;
        evaluate(expression: string): any;
    }
    export {};
}
declare namespace TNTScript {
    class PluginMain implements TNT.Plugin {
        private prv_executor;
        get id(): string;
        get rendererList(): TNT.Renderable[];
        get tags(): string[];
        get version(): string;
        onInit(): void;
    }
}
declare namespace ScriptRun {
    function RunScriptCode(codes: any, dataobj: any): any;
    function init(codes: string): any[];
    function lineRun(code: string): string;
    const VariableCode: (code: string, dataobj: any) => void;
    const RenderCode: (code: string, dataobj: any) => void;
    const WhileCode: (code: string) => void;
    const ImportCode: (code: string, dataobj: any) => void;
}
declare namespace TNTScript {
    class ScriptSymbolTable extends TNT.SymbolTable {
        print: (text: any) => void;
        sleep: (time: number) => void;
        range: (endIndex: number, startIndex?: number) => any;
        constructor();
    }
    namespace Globals {
        let scriptsymboltable: ScriptSymbolTable;
    }
}
declare namespace TNTScript {
    class TagRenderer implements TNT.Renderable {
        render(): void;
    }
}
declare namespace TNTScript {
    function codeSplit(code: string): any[];
    function codeBlock(code: any): (string | any[])[];
    function keySearch(key: string, code: string): string;
    function functionSplit(code: string, original?: boolean): {
        agv: any[];
        functioncanvalue: {};
    };
    function jsTypeToTNTType(TypeName: string): string;
}
