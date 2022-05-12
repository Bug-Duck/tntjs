/**
 * file: PluginMain.ts
 * creator: 27Onion
 * create time: May 8th, 2022, 21:07
 * description: The plugin's main class.
 */

namespace TNTScript {
    export class PluginMain implements TNT.Plugin {
        private prv_executor = new ScriptExecutor();

        get id(): string {
            return "tntscript";
        }
        get rendererList(): TNT.Renderable[] {
            return [new TagRenderer()];
        }
        get tags(): string[] {
            return ["tnt"];
        }
        get version(): string {
            return "v1.0.0-integrated";
        }
        onInit(): void {
            // Do some initialize here.
            console.log("Here")

            // Find all the tnt tags
            for (const tntTag of document.querySelectorAll('tnt')) {
                this.prv_executor.exec(tntTag.innerHTML);
            }
        }
    }
}

TNT.Globals.plug(new TNTScript.PluginMain());
