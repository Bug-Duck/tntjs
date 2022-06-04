namespace TemplateLanguage {
    export class TemplateRenderer implements TNT.Renderable {
        render() {
            this.DoMainRender();
            this.test();
        }

        DoMainRender() {
            const getHttpRequests = document.getElementsByTagName("t-get");
            for (const i of getHttpRequests) {
                Globals.templateData.httpGet(i);
            }
        }

        test() {
            const x = document.getElementsByTagName("p");
            for (const i of x) {
                i.innerHTML = "Hello World!";
            }
        }
    }

    export function templatePlugin(func: () => void) {

    }
}
