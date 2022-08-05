import { reactive } from '../reactivity.js';

const getRenderer = (currentNode, extraContext) => {
    let buffer;
    const getUrlResult = currentNode.props.src;
    const getDatasType = currentNode.props.type;
    const sendDatas = currentNode.props.data;
    const httpGetRequest = new XMLHttpRequest();
    httpGetRequest.open("GET", getUrlResult, false);
    if (typeof sendDatas === "undefined") {
        httpGetRequest.send(null);
    }
    else {
        httpGetRequest.send(sendDatas);
    }
    if (getDatasType === "text") {
        const datas = httpGetRequest.responseText;
        currentNode.children = [datas.toString()];
    }
    else if (getDatasType === "json") {
        const jsonData = httpGetRequest.responseText;
        if (!jsonData)
            return;
        const data = JSON.parse(jsonData);
        buffer = reactive(data);
    }
    buffer["requestData"] = {
        text: httpGetRequest.responseText,
        code: httpGetRequest.status,
    };
    return {
        shouldRender: true,
        injectVariables: buffer,
    };
};
const renderer = {
    renderer: getRenderer,
    name: "getRenderer",
    shouldFire(node) {
        return node.tag === "t-get";
    },
};

export { renderer as default };
//# sourceMappingURL=getRenderer.js.map
