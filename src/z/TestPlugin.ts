class PluginMain implements TNT.Plugin {
    get id(): string {
        return "debug";
    }
    get rendererList(): TNT.Renderable[] {
        return [];
    }
    get tags(): string[] {
        return [];
    }
    get version(): string {
        return "1.0.0"
    }
    onInit(): void {
        console.log("Init!");
    }
}

TNT.Globals.plug(new PluginMain());
