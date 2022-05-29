namespace TNTSimpApi {
    export class PluginMain implements TNT.Plugin {
        get id(): string {
            return "tntjsapi-simp";
        }
        get rendererList(): TNT.Renderable[] {
            return [];
        }
        get tags(): string[] {
            return [];
        }
        get version(): string {
            return "1.0.0-integrated";
        }
        onInit(): void {}  
    }

    export class Value {
        name: string;
        valueObject: TNT.Variable;
        constructor(name: string, type: TNT.TypeInfo) {
            this.name = name;
            this.valueObject = new TNT.Variable(type.defaultValue, type);
        }

        setValue(value: any): Value {
            if (TNT.Globals.hasPlugin("tntdebug")) {
                console.log(`[tntjsapi-simp] Setting value ${value} for variable ${this.name}...`);
            }
            this.valueObject.value = value;
            TNT.Globals.symbolTable.setValue(this.name, this.valueObject);
            if (TNT.Globals.hasPlugin("tntdebug")) {
                console.log(`[tntjsapi-simp] Set value ${value} for variable ${this.name}.`);
            }
            return this; // To enable chain-calls
        }

        get value() {
            return this.valueObject.value;
        }

        get type() {
            return this.valueObject.type;
        }
    }
}

TNT.Globals.plug(new TNTSimpApi.PluginMain());
