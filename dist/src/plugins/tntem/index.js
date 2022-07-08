import { TemplateRenderer } from './TemplateRender.js';

class TemplateLanguagePlugin {
    onInit() {
        const paragraphs = this.root.getElementsByTagName("p");
        [...paragraphs].forEach((p) => {
            p.innerHTML = "testst";
        });
    }
    get id() {
        return "tntem";
    }
    get rendererList() {
        return [new TemplateRenderer()];
    }
    get tags() {
        return [];
    }
    get version() {
        return "1.0.0-integrated";
    }
    get dependencies() {
        return [];
    }
}

export { TemplateLanguagePlugin as default };
//# sourceMappingURL=index.js.map
