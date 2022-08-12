import { __classPrivateFieldSet, __classPrivateFieldGet } from '../node_modules/tslib/tslib.es6.js';
import { deepClone } from './lib/common.js';
import { watchEffect, trigger, track, reactive, ref, computed } from './reactivity.js';
export { computed, getTrackableObject, reactive, ref, targetMap, track, trigger, watchEffect } from './reactivity.js';
import { h, getAttributesOfElement, createVdomFromExistingElement, mount, patch } from './vdom.js';
export { h, mount, patch } from './vdom.js';
export { TNTPlugin } from './plugin.js';

var _TNTApp_instances, _TNTApp_reactiveData, _TNTApp_computedData, _TNTApp_refData, _TNTApp_dataProxy, _TNTApp_originalData, _TNTApp_onMounted, _TNTApp_hooksCalled, _TNTApp_watchEffects, _TNTApp_pageid, _TNTApp_pluginData, _TNTApp_loadPlugin, _TNTApp_mount, _TNTApp_getDataProxy, _TNTApp_useData, _TNTApp_useComputed, _TNTApp_useEffect, _TNTApp_onMounted_, _TNTApp_removeUpdatedElements;
class TNTApp {
    constructor() {
        _TNTApp_instances.add(this);
        _TNTApp_reactiveData.set(this, void 0);
        _TNTApp_computedData.set(this, void 0);
        _TNTApp_refData.set(this, void 0);
        _TNTApp_dataProxy.set(this, void 0);
        _TNTApp_originalData.set(this, void 0);
        _TNTApp_onMounted.set(this, void 0);
        _TNTApp_hooksCalled.set(this, void 0);
        _TNTApp_watchEffects.set(this, void 0);
        _TNTApp_pageid.set(this, void 0);
        _TNTApp_pluginData.set(this, void 0);
        __classPrivateFieldSet(this, _TNTApp_onMounted, () => { }, "f");
        __classPrivateFieldSet(this, _TNTApp_hooksCalled, [], "f");
        __classPrivateFieldSet(this, _TNTApp_computedData, {}, "f");
        __classPrivateFieldSet(this, _TNTApp_reactiveData, {}, "f");
        __classPrivateFieldSet(this, _TNTApp_refData, {}, "f");
        __classPrivateFieldSet(this, _TNTApp_watchEffects, [], "f");
        __classPrivateFieldSet(this, _TNTApp_originalData, {}, "f");
        __classPrivateFieldSet(this, _TNTApp_pluginData, [], "f");
        window.data = {};
        const pageIdElement = document.getElementsByTagName("page-id")[0];
        __classPrivateFieldSet(this, _TNTApp_pageid, pageIdElement.innerHTML, "f");
        pageIdElement.innerHTML = "";
    }
    page(createFunctions, ...page_id) {
        if (__classPrivateFieldGet(this, _TNTApp_pageid, "f") in page_id)
            return;
        (typeof createFunctions.data !== "undefined") ? __classPrivateFieldGet(this, _TNTApp_instances, "m", _TNTApp_useData).call(this, createFunctions.data) : undefined;
        (typeof createFunctions.computed !== "undefined") ? __classPrivateFieldGet(this, _TNTApp_instances, "m", _TNTApp_useComputed).call(this, createFunctions.computed) : undefined;
        (typeof createFunctions.effect !== "undefined") ? __classPrivateFieldGet(this, _TNTApp_instances, "m", _TNTApp_useEffect).call(this, createFunctions.effect) : undefined;
        (typeof createFunctions.mounted !== "undefined") ? __classPrivateFieldGet(this, _TNTApp_instances, "m", _TNTApp_onMounted_).call(this, createFunctions.mounted) : undefined;
        (typeof createFunctions.mount !== "undefined") ? __classPrivateFieldGet(this, _TNTApp_instances, "m", _TNTApp_mount).call(this, createFunctions.mount) : undefined;
    }
    get data() {
        return __classPrivateFieldGet(this, _TNTApp_dataProxy, "f");
    }
    usePlugin(plugin) {
        __classPrivateFieldGet(this, _TNTApp_pluginData, "f").push(plugin);
        return this;
    }
}
_TNTApp_reactiveData = new WeakMap(), _TNTApp_computedData = new WeakMap(), _TNTApp_refData = new WeakMap(), _TNTApp_dataProxy = new WeakMap(), _TNTApp_originalData = new WeakMap(), _TNTApp_onMounted = new WeakMap(), _TNTApp_hooksCalled = new WeakMap(), _TNTApp_watchEffects = new WeakMap(), _TNTApp_pageid = new WeakMap(), _TNTApp_pluginData = new WeakMap(), _TNTApp_instances = new WeakSet(), _TNTApp_loadPlugin = function _TNTApp_loadPlugin(plugin) {
    const funcs = plugin.methods();
    for (const i in funcs) {
        this[i] = funcs[i];
    }
    plugin.onload();
}, _TNTApp_mount = function _TNTApp_mount(container) {
    let isMounted = false;
    let prevVdom = null;
    let currentNode = null;
    __classPrivateFieldGet(this, _TNTApp_hooksCalled, "f").push("mount");
    watchEffect(() => {
        var _a;
        const currentContainer = (_a = currentNode === null || currentNode === void 0 ? void 0 : currentNode.el) !== null && _a !== void 0 ? _a : container.children[0];
        const vnode = h(currentContainer.tagName, getAttributesOfElement(currentContainer), []);
        vnode.el = currentContainer;
        createVdomFromExistingElement(vnode, currentContainer, {});
        currentNode = h(container.tagName, getAttributesOfElement(currentContainer), vnode.children, currentContainer);
        if (!isMounted) {
            prevVdom = deepClone(currentNode);
            mount(prevVdom, container, {});
            isMounted = true;
            __classPrivateFieldGet(this, _TNTApp_instances, "m", _TNTApp_removeUpdatedElements).call(this, container, currentContainer);
            __classPrivateFieldGet(this, _TNTApp_onMounted, "f").call(this, this);
            return;
        }
        const newVdom = deepClone(currentNode);
        patch(prevVdom, newVdom, {});
        prevVdom = deepClone(newVdom);
        __classPrivateFieldGet(this, _TNTApp_instances, "m", _TNTApp_removeUpdatedElements).call(this, container, currentContainer);
    });
    __classPrivateFieldGet(this, _TNTApp_pluginData, "f").forEach(i => {
        __classPrivateFieldGet(this, _TNTApp_instances, "m", _TNTApp_loadPlugin).call(this, i);
    });
    return this;
}, _TNTApp_getDataProxy = function _TNTApp_getDataProxy() {
    const syncData = (target, prop, value) => {
        if (Array.isArray(value)) {
            target.reactive[prop].splice(0, target.reactive[prop].length);
            target.reactive[prop].push(...value);
        }
        trigger(__classPrivateFieldGet(this, _TNTApp_originalData, "f")[prop], prop);
    };
    const handlers = {
        get(target, prop) {
            if (typeof prop === "symbol")
                return undefined;
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
            console.warn(`[TNT warn] You accessed a value not defined (Reading '${prop}').`);
            return undefined;
        },
        set(target, prop, value) {
            if (prop in target.reactive) {
                syncData(target, prop, value);
                return true;
            }
            if (prop in target.ref) {
                target.ref[prop].value = value;
                trigger(target.ref[prop], "value");
                return true;
            }
            console.warn(`[TNT warn] You set a value not defined (Reading '${prop}').`);
            return false;
        },
        has(target, key) {
            if (typeof key === "symbol") {
                key = key.toString();
            }
            if (key in globalThis)
                return false;
            return (key in target.ref || key in target.reactive || key in target.computed);
        },
    };
    return new Proxy({
        reactive: __classPrivateFieldGet(this, _TNTApp_reactiveData, "f"),
        computed: __classPrivateFieldGet(this, _TNTApp_computedData, "f"),
        ref: __classPrivateFieldGet(this, _TNTApp_refData, "f"),
    }, handlers);
}, _TNTApp_useData = function _TNTApp_useData(data) {
    __classPrivateFieldGet(this, _TNTApp_hooksCalled, "f").push("data");
    __classPrivateFieldSet(this, _TNTApp_originalData, deepClone(data), "f");
    __classPrivateFieldSet(this, _TNTApp_reactiveData, {}, "f");
    __classPrivateFieldSet(this, _TNTApp_refData, {}, "f");
    for (const key in data) {
        if (typeof data[key] === "object") {
            __classPrivateFieldGet(this, _TNTApp_reactiveData, "f")[key] = reactive(data[key]);
            continue;
        }
        __classPrivateFieldGet(this, _TNTApp_refData, "f")[key] = ref(data[key]);
    }
    __classPrivateFieldSet(this, _TNTApp_dataProxy, __classPrivateFieldGet(this, _TNTApp_instances, "m", _TNTApp_getDataProxy).call(this), "f");
    window.data = __classPrivateFieldGet(this, _TNTApp_dataProxy, "f");
    return this;
}, _TNTApp_useComputed = function _TNTApp_useComputed(computedValues) {
    __classPrivateFieldGet(this, _TNTApp_hooksCalled, "f").push("computed");
    if (!__classPrivateFieldGet(this, _TNTApp_hooksCalled, "f").includes("data")) {
        console.warn("[TNT warn] useComputed() hook is called before useData(). Any reactive data accessed from computed functions will not be accessable.", "This may lead to unpredictable results or errors.");
    }
    for (const key in computedValues) {
        __classPrivateFieldGet(this, _TNTApp_computedData, "f")[key] = computed(computedValues[key]);
    }
    __classPrivateFieldSet(this, _TNTApp_dataProxy, __classPrivateFieldGet(this, _TNTApp_instances, "m", _TNTApp_getDataProxy).call(this), "f");
    window.data = __classPrivateFieldGet(this, _TNTApp_dataProxy, "f");
    return this;
}, _TNTApp_useEffect = function _TNTApp_useEffect(effect) {
    __classPrivateFieldGet(this, _TNTApp_hooksCalled, "f").push("effect");
    __classPrivateFieldGet(this, _TNTApp_watchEffects, "f").push(effect);
    watchEffect(effect);
    return this;
}, _TNTApp_onMounted_ = function _TNTApp_onMounted_(effect) {
    __classPrivateFieldSet(this, _TNTApp_onMounted, effect, "f");
    return this;
}, _TNTApp_removeUpdatedElements = function _TNTApp_removeUpdatedElements(element, toRemove) {
    if (element.children.length > 1)
        toRemove.remove();
};

export { TNTApp };
//# sourceMappingURL=index.js.map
