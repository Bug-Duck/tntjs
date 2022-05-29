/**
 * file: PluginMain.ts
 * creator: 27Onion
 * create time: May 8th, 2022, 21:07
 * description: The plugin's main class.
 */

//                            _ooOoo_  
//                           o8888888o  
//                           88" . "88  
//                           (| -_- |)  
//                            O\ = /O  
//                        ____/`---'\____  
//                      .   ' \\| |// `.  
//                       / \\||| : |||// \  
//                     / _||||| -:- |||||- \  
//                       | | \\\ - /// | |  
//                     | \_| ''\---/'' | |  
//                      \ .-\__ `-` ___/-. /  
//                   ___`. .' /--.--\ `. . __  
//                ."" '< `.___\_<|>_/___.' >'"".  
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |  
//                 \ \ `-. \_ __\ /__ _/ .-` / /  
//         ======`-.____`-.___\_____/___.-`____.-'======  
//                            `=---='  
//  
//         .............................................
// 不要生气。不要生气。不要生气。这个部分是箱子负责的，只要他代码不要污染
// Runtime，就不用管他，让他乱去好了，我不生气。我不生气。我不生气。

/// <reference path="./ScriptExecutor.ts" />

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
            console.log("Here");

            // Find all the tnt tags
            for (const tntTag of document.querySelectorAll('tnt')) {
                this.prv_executor.exec(tntTag.innerHTML);
            }

            TNT.Globals.setValueEvaluator((e: string) => {
                return this.prv_executor.evaluate(e);
            });
        }
    }
}

TNT.Globals.plug(new TNTScript.PluginMain());
