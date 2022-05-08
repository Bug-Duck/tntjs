/**
 * file: PluginMain.ts
 * creator: 27Onion
 * create time: May 8th, 2022, 21:07
 * description: The plugin's main class.
 */

namespace TNTScript {
    export class PluginMain implements TNT.Plugin {
        get id(): string {
            return "tntscript";
        }
        get rendererList(): TNT.Renderable[] {
            return [];
        }
        get tags(): string[] {
            return ["tnt"];
        }
        get version(): string {
            return "v1.0.0-integrated";
        }
        onInit(): void {
            console.log("Here")
        }
    }
}

TNT.Globals.plug(new TNTScript.PluginMain());
