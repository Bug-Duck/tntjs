import { TNTPlugin } from "./plugin";
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
    page(createFunctions: Record<string, any>, ...page_id: string[]): void;
    get data(): object;
    usePlugin(plugin: TNTPlugin): this;
}
export { computed, getTrackableObject, reactive, ref, targetMap, watchEffect, trigger, track, } from "./reactivity";
export { h, mount, patch } from "./vdom";
export { TNTPlugin } from "./plugin";
