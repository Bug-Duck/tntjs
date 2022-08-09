import { VNode } from "../vdom";
export interface RenderedContent {
    shouldRender: boolean;
    injectVariables?: Record<string, string>;
}
export interface Renderer {
    renderer: (currentNode: VNode, extraContext: object, rootVNode?: VNode, index?: number) => boolean | RenderedContent;
    name: string;
    shouldFire: (node: VNode) => boolean;
    fireOnMounted?: boolean;
}
export declare const renderers: Renderer[];
declare const _default: {
    renderers: Renderer[];
};
export default _default;
