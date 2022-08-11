import { TNTApp, TNTPlugin } from "./dist/src/index.js";

export class testPlugin extends TNTPlugin {
  constructor() {
    super();
    this.name = "testPlugin";
    this.version = "1.0.0";
  }

  onload() {
    console.log("testPlugin!");
  }

  addFunction() {
    return {
      testfunc() {
        console.log("test!!!!!!");
      }
    };
  }
}

const app = new TNTApp()
  .useData({
    x: 233333
  }, "page1", "page2")
  .useEffect(() => {
    console.log("num change!");
  })
  .useComputed({
    y() {
      let y = 0;
      y += 1;
      return y;
    }
  })
  .usePlugin(new testPlugin());
// app.testfunc();
app.mount({
  page1: "root",
});

export default app;