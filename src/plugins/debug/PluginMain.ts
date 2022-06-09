/**
 * The main class of the debugger plugin.
 */

import { Globals } from "runtime/GlobalEnvironment";
import { Plugin, Renderable } from "runtime/Pluggable";
import { DebugRenderTracer } from "./DebugRenderTracer";

export class PluginMain implements Plugin {
  get id(): string {
    return "tntdebug";
  }
  get rendererList(): Renderable[] {
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


Globals.plug(new PluginMain());
