import { TNTApp } from "./dist/src/index.js";

// export class testPlugin extends TNTPlugin {
//   constructor() {
//     super();
//     this.name = "testPlugin";
//     this.version = "1.0.0";
//   }

//   onload() {
//     console.log("testPlugin!");
//   }

//   methods() {
//     return {
//       print(...text) {
//         console.log(...text);
//       }
//     };
//   }
// }

const app = new TNTApp();

app.page({
  data: {
    x: 233333
  },
  mounted() {
    console.log("end!!!");
  },
  mount: document.getElementById("root")
}, "id1");

export default app;