export declare type TNTData = object;
export declare type TNTEffect = () => any;
export declare type TNTComputed = Record<string, TNTEffect>;
declare global {
    export interface Window {
        data: TNTData;
    }
}
export declare class TNTApp {
    #private;
    constructor();
    mount(container: Element): this;
    get data(): object;
    useData(data: TNTData): this;
    useComputed(computedValues: TNTComputed): this;
    useEffect(effect: TNTEffect): this;
    onMounted(effect: TNTEffect): this;
}
export { computed, getTrackableObject, reactive, ref, targetMap, watchEffect, trigger, track, } from "./reactivity";
export { h, mount, patch } from "./vdom";
