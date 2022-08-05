export declare type EffectType = () => void;
export declare type ReactiveType = object;
declare type TargetMap = WeakMap<ReactiveType, Map<string, Set<EffectType>>>;
export declare const targetMap: TargetMap;
interface TrackableCallback {
    onGet: (target: ReactiveType, key: string, receiver: any) => void;
    onSet: (target: ReactiveType, key: string, value: ReactiveType, receiver: any) => void;
    onDeleteProperty: (target: ReactiveType, key: string) => void;
}
export declare const getTrackableObject: (obj: ReactiveType, callbacks: TrackableCallback) => object;
export declare const track: (target: object, key: string) => void;
export declare const trigger: (target: ReactiveType, key: string) => void;
export declare const watchEffect: (effect: EffectType) => void;
export declare const reactive: (target: ReactiveType) => object;
export declare const ref: (raw: ReactiveType) => {
    value: object;
};
export declare const computed: (getter: () => ReactiveType) => {
    value: object;
};
export {};
