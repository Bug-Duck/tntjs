import TNTApp from "./dist/src/index.js";
import DebugPlugin from "./dist/src/plugins/debug/index.js";

window.onload = () => {
  const tmp = [];
  for (let i = 1; i <= 10000; i++) tmp.push(i);
  const app = new TNTApp(document.getElementById("root"));
  app.data({
    testValue: 233,
    testValue2: 456,
    link: {
      link: "https://example.com",
      target: "_blank",
    },
    style: {
      fontSize: 200,
    },
    links: [
      {
        link: "https://example.org",
        target: "_blank",
      },
      {
        link: "https://example.com",
        target: "_blank",
      },
      {
        link: "https://example.com",
        target: "_blank",
      },
    ],
    others: {
      links: [
        "Link A",
        "Link B"
      ],
    },
    test: tmp,
  });
};
