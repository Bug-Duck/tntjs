export default class VTagRenderer {
    #private;
    constructor(customRenderer?: (vTagContent: string) => string);
    defaultRenderer(s: string): string;
    render(): void;
}
