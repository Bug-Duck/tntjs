import { Renderable } from "runtime/Pluggable";

export class DebugRenderTracer implements Renderable {
  render(): void {
    console.log("[Debugger] Renderer called to perform a render.");
  }
}
