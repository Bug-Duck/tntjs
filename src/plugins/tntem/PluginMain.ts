namespace TemplateLanguage {
    export class PluginMain implements TNT.Plugin {
        get id(): string {
            return "temlang";
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
}
