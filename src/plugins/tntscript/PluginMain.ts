/**
 * file: PluginMain.ts
 * creator: 27Onion
 * create time: May 8th, 2022, 21:07
 * description: The plugin's main class.
 */

import { Globals } from "src/runtime/GlobalEnvironment";
import { Plugin, Renderable } from "src/runtime/Pluggable";
import { ScriptExecutor } from "./ScriptExecutor";
import { TagRenderer } from "./TagRenderer";

export class PluginMain implements Plugin {
  #executor = new ScriptExecutor();

  get id(): string {
    return "tntscript";
  }

  get rendererList(): Renderable[] {
    return [new TagRenderer()];
  }

  get tags(): string[] {
    return ["tnt"];
  }

  get version(): string {
    return "v1.0.0-integrated";
  }

  onInit(): void {
    // find all tnt tags
    document.querySelectorAll("tnt").forEach((tntTag) => {
      this.#executor.exec(tntTag.innerHTML);
    });

    Globals.valueEvaluator = ((e: string) => {
      return this.#executor.evaluate(e);
    });
  }
}

 
Globals.plug(new PluginMain());
