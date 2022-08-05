import { TNTApp } from "./dist/src/index.js";

const app = new TNTApp()
  .useData({
    x: 233333
  })
  .mount(document.getElementById("root"));

export default app;