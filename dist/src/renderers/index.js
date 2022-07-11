import AttributeDataRenderer from './AttributeDataRenderer.js';
import ConditionTagRenderer from './ConditionTagRenderer.js';
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
    ConditionTagRenderer,
];
const ignoreRender = ["t-for"];
var renderers$1 = renderers;

export { renderers$1 as default, ignoreRender };
//# sourceMappingURL=index.js.map
