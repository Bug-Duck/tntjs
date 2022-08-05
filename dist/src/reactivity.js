const activeEffects = [];
const targetMap = new WeakMap();
const getTrackableObject = (obj, callbacks) => {
    for (const key in obj) {
        if (typeof obj[key] === "object") {
            obj[key] = getTrackableObject(obj[key], callbacks);
        }
    }
    const proxy = new Proxy(obj, {
        get(target, key, receiver) {
            const result = Reflect.get(target, key, receiver);
            callbacks.onGet(target, key, receiver);
            return result;
        },
        set(target, key, value, receiver) {
            if (typeof value === "object") {
                value = getTrackableObject(value, callbacks);
            }
            const result = Reflect.set(target, key, value, receiver);
            callbacks.onSet(target, key, value, receiver);
            return result;
        },
        deleteProperty(target, key) {
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
const track = (target, key) => {
    if (!activeEffects.length)
        return;
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }
    activeEffects.forEach((effect) => dep.add(effect));
};
const trigger = (target, key) => {
    const depsMap = targetMap.get(target);
    if (!depsMap)
        return;
    const deps = depsMap.get(key);
    if (!deps)
        return;
    deps.forEach((effect) => {
        effect();
    });
};
const watchEffect = (effect) => {
    activeEffects.push(effect);
    effect();
    activeEffects.pop();
};
const reactive = (target) => {
    return getTrackableObject(target, {
        onGet(target, key) {
            track(target, key);
        },
        onSet(target, key) {
            trigger(target, key);
        },
        onDeleteProperty() { },
    });
};
const ref = (raw) => {
    const r = {
        get value() {
            track(r, "value");
            return raw;
        },
        set value(newVal) {
            if (newVal === raw)
                return;
            raw = newVal;
            trigger(r, "value");
        },
    };
    return r;
};
const computed = (getter) => {
    const result = ref(null);
    watchEffect(() => (result.value = getter()));
    return result;
};

export { computed, getTrackableObject, reactive, ref, targetMap, track, trigger, watchEffect };
//# sourceMappingURL=reactivity.js.map
