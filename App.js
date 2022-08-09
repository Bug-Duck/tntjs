import { TNTApp } from "./dist/src/index.js";

const app = new TNTApp()
  .useData({
    x: 233333
  }, "page1", "page2")
  .useData({
    y: 114514
  }, "page1")
  .useEffect(() => {
    console.log("num change!");
  })
  .mount(document.getElementById("root"));

export default app;