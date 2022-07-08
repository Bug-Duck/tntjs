import TNTApp, { NumberType } from "./dist/src/index.js";
import DebugPlugin from "./dist/src/plugins/debug/index.js";

window.onload = () => {
  const app = new TNTApp(document.getElementById("root"));
  app.data({
    xxx: {
      type: NumberType,
      value: 233
    }
  });
  console.log(app.variables);
  setTimeout(() => {
    app.variables.xxx.setValue(456);
  }, 1000);
  app.addPlugins([new DebugPlugin()]);
  app.removePlugins(["tntdebug"]);
};
