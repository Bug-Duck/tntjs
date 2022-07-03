import { Renderable } from "runtime/Pluggable";
import { Logger } from "src/utils/logger";

export class DebugRenderTracer implements Renderable {
  #logger = new Logger("TNT Plugin Debugger");

  render(): void {
    this.#logger.debug("Renderer called to perform a render.");
  }
}
