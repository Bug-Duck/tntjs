/// <reference path="TemplateRender.ts" />
namespace TemplateLanguage {
    export class PluginMain implements TNT.Plugin {
      get id(): string {
        return "temlang";
      }
      get rendererList(): TNT.Renderable[] {
        return [new TemplateRenderer()];
      }
      get tags(): string[] {
        return [];
      }
      get version(): string {
        return "1.0.0-integrated";
      }
      onInit(): void {
        const testst = document.getElementsByTagName("p");
        for (const i of testst) {
          i.innerHTML = "testst";
        }
      }
    }
}

TNT.Globals.plug(new TemplateLanguage.PluginMain());
