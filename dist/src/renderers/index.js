import AttributeDataRenderer from './AttributeDataRenderer.js';
import ForTagRenderer from './ForTagRenderer.js';
import StaticVTagRenderer from './StaticVTagRenderer.js';
import StyleDataRenderer from './StyleDataRenderer.js';
import VTagRenderer from './VTagRenderer.js';

const renderers = [
    VTagRenderer,
    StaticVTagRenderer,
    AttributeDataRenderer,
    StyleDataRenderer,
    ForTagRenderer,
];

export { renderers as default };
//# sourceMappingURL=index.js.map
