import { Plugin } from "runtime/Pluggable";
import { Renderable } from "runtime/Pluggable";
import { TemplateRenderer } from "./TemplateRender";

export default class TemplateLanguagePlugin implements Plugin {
  root: HTMLElement;

  onInit(): void {
    const paragraphs = this.root.getElementsByTagName("p");
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
