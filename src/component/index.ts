// export const readModule = (path: string) => {
//   // Get module datas.
//   const http = new XMLHttpRequest();
//   http.open("GET", `${path}/tnt.module.json`, true); 
//   http.send();
//   const module = JSON.parse(http.responseText);
//   return module;
// };

export class TNTModule {
  #paramers: Record<string, unknown>;

  constructor() {
    this.#paramers = {};
  }

  /**
   * 
   */
  useParamers(paramers: Record<string, unknown>) {
    this.#paramers = paramers;
  }
}


