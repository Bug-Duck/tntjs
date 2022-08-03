/** An effect to be ran when its dependencies change. */
export type EffectType = () => void;
/** Objects that can be reactive. */
export type ReactiveType = object;
/** Map to store reactive object - dependencies - effects data. */
type TargetMap = WeakMap<ReactiveType, Map<string, Set<EffectType>>>;

/** Currently active running effects. */
const activeEffects: EffectType[] = [];
/** {@inheritDoc TargetMap} */
export const targetMap: TargetMap = new WeakMap<TargetMap>();

/** Callbasks when a trackable object changes. */
interface TrackableCallback {
  onGet: (target: ReactiveType, key: string, receiver: any) => void;
  onSet: (
    target: ReactiveType,
    key: string,
    value: ReactiveType,
    receiver: any
  ) => void;
  onDeleteProperty: (target: ReactiveType, key: string) => void;
}

/**
 * Get a trackable proxy object and fire certain callbacks on certain events.
 * @param obj The object to track updates.
 * @param callbacks Callbacks to run when certain event was fired.
 * @returns A proxy to the original object.
 */
export const getTrackableObject = (
  obj: ReactiveType,
  callbacks: TrackableCallback
) => {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      obj[key] = getTrackableObject(obj[key], callbacks);
    }
  }
  const proxy = new Proxy(obj, {
    get(target: ReactiveType, key: string, receiver: any) {
      const result = Reflect.get(target, key, receiver);
      callbacks.onGet(target, key, receiver);
      return result;
    },
    set(target: ReactiveType, key: string, value: object, receiver: any) {
      if (typeof value === "object") {
        value = getTrackableObject(value, callbacks);
      }
      const result = Reflect.set(target, key, value, receiver);
      callbacks.onSet(target, key, value, receiver);
      return result;
    },
    deleteProperty(target: ReactiveType, key: string) {
      const result = Reflect.deleteProperty(target, key);
      callbacks.onDeleteProperty(target, key);
      return result;
    },
  });
  if (Array.isArray(obj)) {
    Object.setPrototypeOf(proxy, Array.prototype);
  }
  return proxy;
};

/**
 * Track the current running effect's dependencies.
 * @param target The reactive object to track.
 * @param key The key to fetch data from.
 */
export const track = (target: object, key: string) => {
  if (!activeEffects.length) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    // using set assures that no duplicate effects will be stored
    dep = new Set();
    depsMap.set(key, dep);
  }
  activeEffects.forEach((effect) => dep.add(effect));
};

/**
 * Trigger effects of certain dependencies.
 * @param target The reactive object to trigger effects.
 * @param key The key to fetch dependencies from.
 */
export const trigger = (target: ReactiveType, key: string) => {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  if (!deps) return;

  deps.forEach((effect) => {
    effect();
  });
};

/**
 * Watch an effect's dependencies.
 * @param effect Effect to run when its dependencies changed.
 */
export const watchEffect = (effect: EffectType) => {
  activeEffects.push(effect);
  effect();
  activeEffects.pop();
};

/**
 * Create a reactive object and enable two-way auto update.
 * @param target The object to be made reactive.
 * @returns The proxied reactive object.
 */
export const reactive = (target: ReactiveType) => {
  return getTrackableObject(target, {
    onGet(target, key) {
      track(target, key);
    },
    onSet(target, key) {
      trigger(target, key);
    },
    onDeleteProperty() {},
  });
};

/**
 * Create a reactive reference to a plain value.
 * @param raw A raw value to be reactive.
 * @returns The proxied object with `.value` getters and setters.
 */
export const ref = (raw: ReactiveType) => {
  const r = {
    get value() {
      track(r, "value");
      return raw;
    },
    set value(newVal) {
      if (newVal === raw) return;
      raw = newVal;
      trigger(r, "value");
    },
  };
  return r;
};

/**
 * Create a reactive computed value.
 * @note `computed` is built on top of {@link ref} API. Any updates must be using `.value` accessor.
 * @param getter Function to calculate the computed value.
 * @returns A reference object to the computed value.
 */
export const computed = (getter: () => ReactiveType) => {
  const result = ref(null);
  watchEffect(() => (result.value = getter()));
  return result;
};
