declare namespace TNTDebug {
    class DebugRenderTracer implements TNT.Renderable {
        render(): void;
    }
}
declare namespace TNT {
    class TypeInfo {
        private prv_namespaceName;
        private prv_typeName;
        constructor(namespaceName: string, typeName: string);
        toString(): string;
        get name(): string;
        get owner(): string;
    }
}
declare namespace TNT {
    const StringType: TypeInfo;
    const NumberType: TypeInfo;
    const ObjectType: TypeInfo;
    const TNTFunctionType: TypeInfo;
    const JSFunctionType: TypeInfo;
    const HTMLStringType: TypeInfo;
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
    }
}
declare namespace TNT {
    namespace Globals {
        let symbolTable: SymbolTable;
        let instances: Array<TNT>;
        function setValueEvaluator(fn: (expr: string) => any): void;
        function evaluate(expr: string): any;
        function addPlugin(plugin: Plugin): void;
        function plug(plugin: Plugin): void;
        function getAllPlugins(): Array<Plugin>;
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
    class TNT {
        private prv_vTagRenderer;
        private prv_options;
        private prv_isDebug;
        private prv_refreshLock;
        private prv_checkOptionTags;
        constructor();
        render(): void;
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
declare namespace TNTScript {
    class ScriptExecutor {
        exec(scriptContent: string, data?: Object): true | Object;
        ValueProcess(reg: string): any;
    }
}
declare namespace TNTScript {
    class TagRenderer implements TNT.Renderable {
        render(): void;
    }
}
declare namespace TNTScript {
    function TNTCodeSplit(code: string): any[];
    function codeKuai(code: any): (string | any[])[];
    function keySearch(key: string, code: string): string;
    function TNTFunctionSplit(code: string, original?: boolean): {
        agv: any[];
        functioncanvalue: {};
    };
    function JsTypeToTNTType(TypeName: any): "string" | "number" | "bool";
}
