namespace tntem {
    export class TNTem implements TNT.Renderable {
        render() {
            this.DoMainRender()
        }

        DoMainRender() {
            const gets = document.getElementsByTagName("t-get")
            for (const i of gets) {
                tphttpget(i);
            }
        }
    }
}
