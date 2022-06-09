export default class StaticVTagRenderer {
    #private;
    constructor(customRenderer?: (vTagContent: string) => string);
    render(): void;
}
