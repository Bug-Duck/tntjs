import { Globals } from '../../runtime/GlobalEnvironment.js';
import { TemplateRenderer } from './TemplateRender.js';

class PluginMain {
    onInit() {
        const paragraphs = document.getElementsByTagName("p");
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
Globals.plug(new PluginMain());

export { PluginMain };
//# sourceMappingURL=PluginMain.js.map
