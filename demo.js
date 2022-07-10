import TNTApp from "./dist/src/index.js";
import DebugPlugin from "./dist/src/plugins/debug/index.js";

window.onload = () => {
  const app = new TNTApp(document.getElementById("root"), () => {
    // onload
    console.log(app.variables);
    setTimeout(() => {
      app.variables.testValue.setValue(456);
    }, 1000);
    app.addPlugins([new DebugPlugin()]);
    console.log(app.variables);
  });
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
    test: {
      a: [
        "a", "b", "c"
      ]
    }
  });
};
