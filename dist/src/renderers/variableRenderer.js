import{evaluate as r}from"../lib/common.js";import{watchEffect as e}from"../reactivity.js";const o={renderer:(o,t)=>(e((()=>{o.children=[r(o.props.data,t).toString()]})),!0),name:"variableRenderer",shouldFire:r=>"v"===r.tag};export{o as default};
//# sourceMappingURL=variableRenderer.js.map
