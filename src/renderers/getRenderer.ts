import { reactive } from "../reactivity";
import { VNode } from "../vdom";
import { RenderedContent, Renderer } from "./index";

const getRenderer = (
  currentNode: VNode,
  extraContext: object
): RenderedContent => {
  let buffer: {};
  // get url datas from src
  const getUrlResult = currentNode.props.src;
  const getDatasType = currentNode.props.type;
  const sendDatas = currentNode.props.data;
  const httpGetRequest = new XMLHttpRequest();
  // TODO: improve this request method to async and don't do sync operations on the main thread
  httpGetRequest.open("GET", getUrlResult, false);
  if (typeof sendDatas === "undefined") {
    httpGetRequest.send(null);
  } else {
    httpGetRequest.send(sendDatas);
  }
  if (getDatasType === "text") {
    const datas = httpGetRequest.responseText;
    currentNode.children = [datas.toString()];
  } else if (getDatasType === "json") {
    const jsonData = httpGetRequest.responseText;
    if (!jsonData) return;
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

const renderer: Renderer = {
  renderer: getRenderer,
  name: "getRenderer",
  shouldFire(node) {
    return node.tag === "t-get";
  },
};

export default renderer;
