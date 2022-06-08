namespace TNTDebug {
    export class DebugRenderTracer implements TNT.Renderable {
      render(): void {
        console.log("[Debugger] Renderer called to perform a render.");
      }
    }
}
