import VTagRenderer from "./VTagRenderer";
export default class TNT {
    #private;
    constructor();
    checkOptionTags(): {
        isDebugModeOn: boolean;
        isTNTScriptOn: boolean;
        isPureModeOn: boolean;
        isFlipModeOn: boolean;
        pluginsToBeDisabled: string[];
    };
    onDebugModeDisabled(): void;
    onTNTScriptDisabled(): void;
    disablePlugins(plugins: any): void;
    onPureModeOn(): void;
    onFlipModeOn(): void;
    render(): void;
    onRender(): void;
    get vTagRenderer(): VTagRenderer;
}
