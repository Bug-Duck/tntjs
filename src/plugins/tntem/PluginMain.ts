import { Plugin } from "runtime/Pluggable";
import { Globals } from "runtime/GlobalEnvironment";
import { Renderable } from "runtime/Pluggable";
import { TemplateRenderer } from "./TemplateRender";

export class PluginMain implements Plugin {
  onInit(): void {
    const paragraphs = document.getElementsByTagName("p");
    [...paragraphs].forEach((p) => {
      p.innerHTML = "testst";
    });
  }

  get id(): string {
    return "tntem";
  }

  get rendererList(): Renderable[] {
    return [new TemplateRenderer()];
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
}

Globals.plug(new PluginMain());
