import { deepClone } from "./lib/common";
import {
  computed,
  reactive,
  ref,
  track,
  trigger,
  watchEffect,
} from "./reactivity";
import {
  createVdomFromExistingElement,
  getAttributesOfElement,
  h,
  mount,
  patch,
  VNode,
} from "./vdom";
import {
  TNTPlugin
} from "./plugin";

export type TNTData = object;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TNTEffect = () => any;

export type TNTComputed = Record<string, TNTEffect>;

// tweak the Window object a bit to pass type check
declare global {
  export interface Window {
    data: TNTData;
  }
}

/** Create a new TNTjs application. */
export class TNTApp {
  /** Reactive data object */
  #reactiveData: object;
  /** Computed data object */
  #computedData: object;
  /** Reference-value data object */
  #refData: object;
  /** Helper proxy for watching modifications on data */
  #dataProxy: object;
  /** Original data passed into {@link TNTApp.useData()} */
  #originalData: object;
  /** Function to run when application was first mounted */
  #onMounted: (app: TNTApp) => void;
  /** Helper array for storing currently called `TNTApp.use*` hooks. */
  #hooksCalled: string[];
  /** Effects watched in {@link TNTApp.useEffect()} */
  #watchEffects: TNTEffect[];
  /** HTML Files's page-id */
  #pageid: string;
  /** TNTPlugin data list*/
  #pluginData: TNTPlugin[];


  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.#onMounted = () => { };
    this.#hooksCalled = [];
    this.#computedData = {};
    this.#reactiveData = {};
    this.#refData = {};
    this.#watchEffects = [];
    this.#originalData = {};
    this.#pluginData = [];
    window.data = {};

    // pageID
    const pageIdElement = document.getElementsByTagName("page-id")[0];
    this.#pageid = pageIdElement.innerHTML;
    pageIdElement.innerHTML = "";
  }

  page(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createFunctions: Record<string, any>,
    ...page_id: string[]
  ) {
    if (this.#pageid in page_id) return;
    (typeof createFunctions.data !== "undefined") ? this.#useData(createFunctions.data) : undefined;
    (typeof createFunctions.computed !== "undefined") ? this.#useComputed(createFunctions.computed) : undefined;
    (typeof createFunctions.effect !== "undefined") ? this.#useEffect(createFunctions.effect) : undefined;
    (typeof createFunctions.mounted !== "undefined") ? this.#onMounted_(createFunctions.mounted) : undefined;
    (typeof createFunctions.mount !== "undefined") ? this.#mount(createFunctions.mount) : undefined;
  }

  #loadPlugin(plugin: TNTPlugin) {
    const funcs = plugin.methods();
    for (const i in funcs) {
      this[i] = funcs[i];
    }
    plugin.onload();
  }

  /**
   * Initialize and mount a new TNT Application.
   * @param container The container element to mount with.
   * @returns Mounted TNTApp instance.
   */
  #mount(container: Element) {
    let isMounted = false;
    let prevVdom: VNode | null = null;
    let currentNode = null;
    this.#hooksCalled.push("mount");

    // app lifecycle loop
    watchEffect(() => {
      const currentContainer: Element =
        currentNode?.el ?? container.children[0];
      const vnode = h(
        currentContainer.tagName,
        getAttributesOfElement(currentContainer),
        []
      );
      vnode.el = currentContainer;
      createVdomFromExistingElement(vnode, currentContainer, {});
      currentNode = h(
        container.tagName,
        getAttributesOfElement(currentContainer),
        vnode.children,
        currentContainer
      );
      if (!isMounted) {
        prevVdom = deepClone(currentNode);
        mount(prevVdom, container, {});
        isMounted = true;
        this.#removeUpdatedElements(container, currentContainer);
        this.#onMounted(this);
        return;
      }
      const newVdom: VNode = deepClone(currentNode);
      patch(prevVdom, newVdom, {});
      prevVdom = deepClone(newVdom);
      this.#removeUpdatedElements(container, currentContainer);
    });

    this.#pluginData.forEach(i => {
      this.#loadPlugin(i);
    });

    return this;
  }

  /** All defined reactive / ref data. */
  get data() {
    return this.#dataProxy;
  }

  /**
   * Generate a new TNT data proxy based on reactive and reference data.
   * The generated proxy will watch for re-assignments as well as reading values and handle edge cases.
   * @returns Proxied TNT data object.
   */
  #getDataProxy() {
    type MixedTarget = { reactive: object; computed: object; ref: object };

    const syncData = (target: MixedTarget, prop: string, value: object) => {
      // edge-case handling for re-assgining arrays
      if (Array.isArray(value)) {
        // re-creating the reactive array will drop its former effects
        // so for work-around this will clear the array and push new elements into it
        // TODO: improve performance for re-assigning reactive arrays
        target.reactive[prop].splice(0, target.reactive[prop].length);
        target.reactive[prop].push(...value);
      }
      // manually trigger an update
      trigger(this.#originalData[prop], prop);
    };

    const handlers = {
      get(target: MixedTarget, prop: string | symbol) {
        if (typeof prop === "symbol") return undefined;
        prop = prop.toString();
        if (prop in target.reactive) {
          return target.reactive[prop];
        }
        if (prop in target.computed) {
          return target.computed[prop].value;
        }
        if (prop in target.ref) {
          track(target.ref[prop], "value");
          return target.ref[prop].value;
        }
        console.warn(
          `[TNT warn] You accessed a value not defined (Reading '${prop}').`
        );
        return undefined;
      },
      set(target: MixedTarget, prop: string, value: object) {
        if (prop in target.reactive) {
          syncData(target, prop, value);
          return true;
        }
        if (prop in target.ref) {
          target.ref[prop].value = value;
          trigger(target.ref[prop], "value");
          return true;
        }
        console.warn(
          `[TNT warn] You set a value not defined (Reading '${prop}').`
        );
        return false;
      },
      has(target: MixedTarget, key: string | symbol) {
        if (typeof key === "symbol") {
          key = key.toString();
        }
        if (key in globalThis) return false;
        return (
          key in target.ref || key in target.reactive || key in target.computed
        );
      },
    };

    return new Proxy(
      {
        reactive: this.#reactiveData,
        computed: this.#computedData,
        ref: this.#refData,
      },
      handlers
    );
  }

  usePlugin(plugin: TNTPlugin) {
    this.#pluginData.push(plugin);
    return this;
  }

  /**
   * Hook to create reactive data objects.
   * @param data Data to become reactive.
   * @returns Current `TNTApp` instance.
   */
  #useData(data: TNTData) {
    this.#hooksCalled.push("data");
    this.#originalData = deepClone(data);
    this.#reactiveData = {};
    this.#refData = {};
    for (const key in data) {
      if (typeof data[key] === "object") {
        this.#reactiveData[key] = reactive(data[key]);
        continue;
      }
      this.#refData[key] = ref(data[key]);
    }
    this.#dataProxy = this.#getDataProxy();
    window.data = this.#dataProxy;
    return this;
  }

  /**
   * Hook to create computed values with ease.
   * @param computedValues Functions to calcuate each computed value.
   * @returns Current `TNTApp` instance.
   */
  #useComputed(computedValues: TNTComputed) {
    this.#hooksCalled.push("computed");
    if (!this.#hooksCalled.includes("data")) {
      console.warn(
        "[TNT warn] useComputed() hook is called before useData(). Any reactive data accessed from computed functions will not be accessable.",
        "This may lead to unpredictable results or errors."
      );
    }
    for (const key in computedValues) {
      this.#computedData[key] = computed(computedValues[key]);
    }
    this.#dataProxy = this.#getDataProxy();
    window.data = this.#dataProxy;
    return this;
  }

  /**
   * Hook to watch effect dependency updates.
   * @param effect Effect function to watch.
   * @returns Current `TNTApp` instance.
   */
  #useEffect(effect: TNTEffect) {
    this.#hooksCalled.push("effect");
    this.#watchEffects.push(effect);
    watchEffect(effect);
    return this;
  }

  /**
   * Run the specified effect when application is mounted.
   * @param effect Effect to run when application is mounted.
   * @returns Current `TNTApp` instance.
   */
  #onMounted_(effect: TNTEffect) {
    this.#onMounted = effect;
    return this;
  }

  /**
   * Remove older child elements.
   * @param element The root element to check children length.
   * @param toRemove The child element to remove.
   */
  #removeUpdatedElements(element: Element, toRemove: Element) {
    if (element.children.length > 1) toRemove.remove();
  }
}

export {
  computed,
  getTrackableObject,
  reactive,
  ref,
  targetMap,
  watchEffect,
  trigger,
  track,
} from "./reactivity";
export { h, mount, patch } from "./vdom";
export { TNTPlugin } from "./plugin";
