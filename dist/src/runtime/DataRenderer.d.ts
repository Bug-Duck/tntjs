export declare class DataRenderer {
    #private;
    constructor(root: HTMLElement);
    tagDataRender(): void;
    tagStyleRender(): void;
    analysis(toAnalysis: string): Record<string, string>;
}
