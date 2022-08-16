import { TNTApp } from "./dist/src/index.js";

const app = new TNTApp();

app.page({
  data: {
    x: 233333,
    bool: true,
    lib: [true, false, true]
    
  },
  mounted() {
    console.log("end!!!");
  },
  effect() {
    console.log(data.x);
  },
  ready() {
    console.log("Hello world");
  },
  mount: document.getElementById("root")
}, "id1");

export default app;