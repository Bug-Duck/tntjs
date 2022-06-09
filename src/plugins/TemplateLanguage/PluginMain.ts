import { Plugin } from "runtime/Pluggable";
import { Globals } from "runtime/GlobalEnvironment";
import { Renderable } from "runtime/Pluggable";
import { TemplateRenderer } from "./TemplateRender";

export class PluginMain implements Plugin {
  dependencies: string[];

  constructor() {
    this.dependencies = [];
  }

  onInit(): void {
    const paragraphs = document.getElementsByTagName("p");
    [...paragraphs].forEach((p) => {
      p.innerHTML = "testst";
    });
  }

  get id(): string {
    return "temlang";
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
}

Globals.plug(new PluginMain());
