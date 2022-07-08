/**
 * The main class of the debugger plugin.
 */

import { Plugin, Renderable } from "runtime/Pluggable";
import { DebugRenderTracer } from "./DebugRenderTracer";
import { Logger } from "src/lib/logger";

export default class DebugPlugin implements Plugin {
  #logger = new Logger("TNT Debugger");

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

  get dependencies(): string[] {
    return [];
  }

  onInit(): void {
    this.#logger.debug("[Debugger] Debug mode enabled. ");
  }
}
