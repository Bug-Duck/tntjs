import renderer from './variableRenderer.js';
import renderer$1 from './conditionRenderer.js';
import renderer$2 from './loopRenderer.js';
import renderer$3 from './attributeRenderer.js';
import renderer$4 from './getRenderer.js';

const renderers = [
    renderer,
    renderer$1,
    renderer$2,
    renderer$3,
    renderer$4,
];
var renderers$1 = {
    renderers,
};

export { renderers$1 as default, renderers };
//# sourceMappingURL=index.js.map
