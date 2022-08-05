export declare type VNodeChild = VNode | string;
export interface VNode {
    tag: string;
    props: Record<string, string>;
    children: VNodeChild[];
    el: Element;
}
export declare const h: (tag: string, props: Record<string, string>, children: VNodeChild[], el?: Element) => VNode;
export declare const mount: (vnode: VNode, container: Element, extraContext?: object) => Element;
export declare const patch: (n1: VNode, n2: VNode, extraContext?: object) => void;
export declare const getAttributesOfElement: (element: Element) => Record<string, string>;
export declare const createVdomFromExistingElement: (rootVNode: VNode, container: Element, extraContext?: object) => void;
export declare const createVNodeFromElement: (node: Element) => VNode;
