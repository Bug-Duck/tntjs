namespace tntem {
    export class TNTem implements TNT.Renderable {
        render() {
            this.DoMainRender();
            this.test();
        }

        DoMainRender() {
            const gets = document.getElementsByTagName("t-get");
            for (const i of gets) {
                tphttpget(i);
            }
        }

        test() {
            const x = document.getElementsByTagName("p");
            for (const i of x) {
                i.innerHTML = "Hello World!";
            }
        }
    }
}
