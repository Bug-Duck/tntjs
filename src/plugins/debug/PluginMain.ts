/**
 * file: PluginMain.ts
 * creator: 27Onion
 * create time: May 10th, 2022, 20:25
 * description: The main class of the debugger plugin.
 */

/// <reference path="../../runtime/GlobalEnvironment.ts" />

namespace TNTDebug {
    export class PluginMain implements TNT.Plugin {
      get id(): string {
        return "tntdebug";
      }
      get rendererList(): TNT.Renderable[] {
        return [new DebugRenderTracer()];
      }
      get tags(): string[] {
        return [];
      }
      get version(): string {
        return "1.0.0-integrated";
      }
      onInit(): void {
        console.log("[Debugger] Debug mode enabled. ");
      }
        
    }
}

TNT.Globals.plug(new TNTDebug.PluginMain());
