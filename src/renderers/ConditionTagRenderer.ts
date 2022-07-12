import { generateId, removeNodesWithParents } from "lib/common";
import { evaluate, valueEvaluationFailedMessage } from "runtime/GlobalEnvironment";
import { SymbolTable } from "runtime/SymbolTable";
import { ignoreRender, Renderer } from "./index";

export type ConditionTagCustomRenderer = (
  parentElement: Element,
  conditionTag: ConditionTag
) => void;

export interface ConditionTagData {
  type: "if" | "elif" | "else";
  condition: string;
  children: Element[];
  show: boolean;
}

export interface ConditionTag {
  ifTag: ConditionTagData;
  elifTags: ConditionTagData[];
  elseTag?: ConditionTagData;
}

export default class ConditionTagRenderer implements Renderer {
  #root: HTMLElement;
  #symbolTable: SymbolTable;
  #customRenderer: ConditionTagCustomRenderer;
  #tagData: Record<string, ConditionTag>;

  constructor(
    root: HTMLElement,
    symbolTable: SymbolTable,
    customRenderer?: ConditionTagCustomRenderer
  ) {
    this.#root = root;
    this.#symbolTable = symbolTable;
    this.#customRenderer = customRenderer;
    this.#tagData = {};
    this.defaultRenderer = this.defaultRenderer.bind(this);
  }

  #getConditionTagsByIfTag(ifTag: Element) {
    const allowedTagNames = ["t-else", "t-elif"];
    let nextSibling = ifTag.nextElementSibling;
    let elseTag: Element = null;
    const elifTags: Element[] = [];
    while (
      nextSibling &&
      allowedTagNames.includes(nextSibling.nodeName.toLowerCase())
    ) {
      if (nextSibling.nodeName.toLowerCase() === "t-else") {
        elseTag = nextSibling;
        break;
      }
      if (nextSibling.nodeName.toLowerCase() === "t-elif") {
        elifTags.push(nextSibling);
        nextSibling = nextSibling.nextElementSibling;
      }
    }
    return {
      elseTag,
      elifTags,
    };
  }

  #renderTagContents(parentElement: Element, children: Element[]) {
    children.forEach((child) => {
      parentElement.appendChild(child);
    });
  }

  defaultRenderer(parentElement: Element, conditionTag: ConditionTag) {
    if (!conditionTag) {
      return;
    }
    const ifTagValue = evaluate(
      this.#symbolTable,
      conditionTag.ifTag.condition
    );
    if (ifTagValue && !ifTagValue.toString().startsWith(valueEvaluationFailedMessage)) {
      this.#renderTagContents(parentElement, conditionTag.ifTag.children);
      return;
    }
    for (const elifTag of conditionTag.elifTags) {
      const elifTagValue = evaluate(this.#symbolTable, elifTag.condition);
      if (elifTagValue && !elifTagValue.toString().startsWith(valueEvaluationFailedMessage)) {
        this.#renderTagContents(parentElement, elifTag.children);
        return;
      }
    }
    if (conditionTag.elseTag) {
      this.#renderTagContents(parentElement, conditionTag.elseTag.children);
      return;
    }
  }

  render() {
    const ifTags = [...this.#root.getElementsByTagName("t-if")];
    const render = this.#customRenderer ?? this.defaultRenderer;
    removeNodesWithParents(ifTags, ignoreRender).slice().forEach((ifTag) => {
      const isRendered = ifTag.getAttribute("data-rendered");
      if (isRendered) {
        const tagId = ifTag.getAttribute("data-id");
        render(ifTag, this.#tagData[tagId]);
        return;
      }
      ifTag.setAttribute("data-rendered", "YES");
      ifTag.setAttribute("data-original", ifTag.getAttribute("cond"));
      // ifTag.removeAttribute("cond");
      const ifTagData: ConditionTagData = {
        type: "if",
        condition: ifTag.getAttribute("data-original"),
        children: [...ifTag.children],
        show: false,
      };
      ifTag.innerHTML = "";
      const { elifTags: elifTagElements, elseTag: elseTagElement } =
          this.#getConditionTagsByIfTag(ifTag);
      const elseTag: ConditionTagData = elseTagElement ? {
        type: "else",
        condition: "true",
        children: [...elseTagElement.children],
        show: false
      } : null;
      const elifTags: ConditionTagData[] = [];

      elseTagElement?.remove();
      elifTagElements.forEach((element) => {
        elifTags.push({
          type: "elif",
          condition: element.getAttribute("cond"),
          children: [...element.children],
          show: false,
        });
        element.remove();
      });
      const tagId = generateId() ?? ifTag.getAttribute("data-id");
      if (!ifTag.getAttribute("data-id")) ifTag.setAttribute("data-id", tagId);
      const tagData: ConditionTag = {
        ifTag: ifTagData,
        elifTags,
        elseTag,
      };
      this.#tagData[tagId] = tagData;
      render(ifTag, this.#tagData[tagId]);
    });
  }
}
