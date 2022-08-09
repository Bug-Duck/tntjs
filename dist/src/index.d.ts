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
    exp: symbol;
    constructor();
    mount(container: Element, ...idList: string[]): this;
    get data(): object;
    useData(data: TNTData, ...idList: string[]): this;
    useComputed(computedValues: TNTComputed, ...idList: string[]): this;
    useEffect(effect: TNTEffect, ...idList: string[]): this;
    onMounted(effect: TNTEffect, ...idList: string[]): this;
}
export { computed, getTrackableObject, reactive, ref, targetMap, watchEffect, trigger, track, } from "./reactivity";
export { h, mount, patch } from "./vdom";
