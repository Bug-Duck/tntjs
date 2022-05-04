declare namespace TNT {
    enum Type {
        StringType = "tnt:type.string",
        NumberType = "tnt:type.number",
        ObjectType = "tnt:type.object",
        TNTFunctionType = "tnt:type.function",
        JSFunctionType = "js:type.function"
    }
    class Variable {
        private prv_value;
        private prv_type;
        constructor(value: any, type: Type);
        private prv_validate;
        get value(): any;
        set value(value: any);
        get type(): Type;
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
    }
}
declare namespace TNT {
    class TNT {
        private vTagRenderer;
        constructor();
        render(): void;
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
