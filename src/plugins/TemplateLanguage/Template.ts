
namespace TemplateLanguage {
    export class Template {

    }

    export class Component {
        name: string;
        exec: (dom: any, par?: Record<string, unknown>) => (string | void);
        constructor (name: string, ComponentExec: (dom, ...par: any) => (string | void)) {
            this.name = name;
            this.exec = ComponentExec;
        }
    }
}

