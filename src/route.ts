// export class Route {
//   #routeList: r[];
//   #main: String;

//   constructor() {
//     /**
//      * 1.第一次渲染,调用change
//      * 2.当hash(#后面的值)发生变化,调用一次change
//      * 3.change变化之后,改变url hash的值
//      */
//     console.log("%c第一次初始化", "color: red");
//     this.#change(window.location.hash.replace(/#/, ""));
//     window.onhashchange = () => {
//       console.log("%c检测到#后的值变化", "color: red");
//       this.#change(window.location.hash.replace(/#/, ""));
//     };
//     this.#routeList = [];
//   }

//   /**
//    * load the route
//    * @date 2022-07-22
//    * @param {r} obj path and element (route object)
//    * @returns {any}
//    */
//   useRoute(obj: r): void {
//     this.#routeList.push(obj);
//     console.log("%c 加载路由成功！", "color: red");
//   }

//   /**
//    * set the router main page
//    * @date 2022-07-22
//    * @param {String} path main page path
//    * @returns {any}
//    */
//   useMainRoute(path: String): void {
//     this.#main = path;
//     console.log("%c设置主路由成功！", "color: red");
//   }

//   toggle(path: String) {
//     this.#change(window.location.hash.replace(/#/, ""));
//     window.history.pushState({}, document.title, `#${path.toString()}`);
//     console.log("%c页面切换成功！", "color: red");
//     // window.location.hash = path.toString();
//   }

//   #change(path: String) {
//     /** */
//     if (typeof this.#main === "undefined") return console.log("%c监测到没有设置主路由", "color: red");
//     if (path === "") {
//       console.log("%c 监测到#后为空，设置为主路由","color: red");
//       try {
//         this.#routeList.forEach((i) => {
//           if (i.path === this.#main) {
//             i.ele.style.display = "block";
//             throw new Error("break");
//           } else {
//             i.ele.style.display = "none";
//           }
//         });
//       } catch (e) {
//         if (e !== "break") throw e;
//       }
//     } else {
//       this.#routeList.forEach((i) => {
//         if (i.path !== path) {
//           i.ele.style.display = "block";
//           window.location.hash = path.toString();
//         } else {
//           i.ele.style.display = "none";
//         }
//       });
//     }
//     console.log("%c视图渲染成功！", "color: red");
//   }
// }

// export class r {
//   #path: String;
//   #pageElementObject: HTMLElement;

//   constructor(path: String, pageElementObject: HTMLElement) {
//     this.#pageElementObject = pageElementObject;
//     this.#path = path;
//   }

//   get path() {
//     return this.#path;
//   }

//   get ele() {
//     return this.#pageElementObject;
//   }
// }

// const Router = new Route();
// export { Router };
