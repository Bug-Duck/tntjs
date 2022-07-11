import { generateId, getParentNodes, removeNodesWithParents } from "lib/common";
import { evaluate, TNTInstances } from "runtime/GlobalEnvironment";
import {
  ObjectType,
  SymbolTable,
  VariableValueType,
} from "runtime/SymbolTable";
import TNT from "runtime/TNT";
import { Variable } from "../index";
import { ignoreRender, Renderer } from "./index";

export type ForTagCustomRenderer = (
  parentVariable: VariableValueType,
  localVariableName: string,
  childElement: Element,
  parentElement: Element
) => string;

export type ParentVariableValue = VariableValueType;

export default class ForTagRenderer implements Renderer {
  #customRenderer: ForTagCustomRenderer;
  #root: HTMLElement;
  #symbolTable: SymbolTable;
  #tagChildren: Record<string, Element>;
  #TNTInstances: Record<string, TNT>;
  #elementIds: Record<number, string>;

  constructor(
    root: HTMLElement,
    symbolTable: SymbolTable,
    customRenderer?: ForTagCustomRenderer
  ) {
    this.#root = root;
    this.#symbolTable = symbolTable;
    this.#customRenderer = customRenderer;
    this.#tagChildren = {};
    this.#TNTInstances = {};
    this.#elementIds = {};
    this.defaultRenderer = this.defaultRenderer.bind(this);
  }

  #parseOperation(tag: Element) {
    const forOperation = tag.getAttribute("data-original").split(" in ", 2);
    const localVariableName = forOperation[0],
      parentVariableName = forOperation[1];
    const parentVariableValue = evaluate(this.#symbolTable, parentVariableName);
    return { localVariableName, parentVariableValue };
  }

  defaultRenderer(
    parentVariable: VariableValueType,
    localVariableName: string,
    childElement: Element,
    parentElement: Element
  ) {
    if (!Array.isArray(parentVariable)) {
      return `[ERROR] Cannot use non-array variables in <t-for />. Excepted Array, got ${typeof parentVariable}.`;
    }

    if (!childElement) {
      return "[ERROR] Child elements must not be undefined.";
    }

    // for better GC at unused TNT instances
    for (const TNTInstance in this.#TNTInstances) {
      const currentIndex = TNTInstances.indexOf(this.#TNTInstances[TNTInstance]);
      TNTInstances.splice(currentIndex, currentIndex);
    }
    this.#TNTInstances = {};

    // clear previously rendered content
    parentElement.innerHTML = "";
    (parentVariable as Array<ParentVariableValue>).forEach((item, index) => {
      const customSymbolTable = new SymbolTable();
      const currentVariable = new Variable(
        customSymbolTable,
        localVariableName,
        ObjectType
      );
      const currentId = this.#elementIds[index] ?? generateId();
      if (!this.#elementIds[index]) {
        this.#elementIds[index] = currentId;
      }
      currentVariable.setValue(item);
      // merge the global table to the inner table
      customSymbolTable.merge(this.#symbolTable, (oldValue) => oldValue);
      childElement.setAttribute("data-id", currentId);
      parentElement.appendChild(childElement.cloneNode(true));
      // inner variable renderer
      const currentTNTInstance =
        this.#TNTInstances[currentId] ??
        new TNT(
          parentElement.querySelector(`[data-id="${currentId}"]`),
          customSymbolTable
        );
      if (!this.#TNTInstances[currentId]) {
        this.#TNTInstances[currentId] = currentTNTInstance;
      }
      currentTNTInstance.render();
    });
  }

  #validateElements (tag: Element) {
    if (tag.children.length > 1) {
      return "[ERROR] <t-for /> elements can have at most 1 direct child element. Try wrapping your elements into a <div /> and try again.";
    }
    if (tag.children[0].tagName.toLowerCase() === "t-for") {
      return "[ERROR] <t-for /> elements' direct child cannot be <t-for />. Try wrapping it with a <div /> element and try again.";
    }
    return null;
  }

  render () {
    const forTags = [...this.#root.getElementsByTagName("t-for")];
    const render = this.#customRenderer ?? this.defaultRenderer;

    for (const currentTag of forTags) {
      let isCurrentChild = false;
      for (const parentTag of forTags) {
        if (getParentNodes(parentTag).includes(currentTag)) {
          isCurrentChild = true;
          break;
        }
      }
      if (isCurrentChild) continue;
      currentTag.setAttribute("data-rendering", "YES");
    }

    removeNodesWithParents(forTags, ["t-for"]).forEach((tag) => {
      const rendered = tag.getAttribute("data-rendered");
      if (rendered === null) {
        const error = this.#validateElements(tag);
        if (error) {
          tag.textContent = error;
          return;
        }
    
        const tagId = generateId();
        tag.setAttribute("data-rendered", "YES");
        tag.setAttribute("data-id", tagId);
        // store in a separate variable instead of in attributes
        this.#tagChildren[tagId] = tag.children[0];
        tag.setAttribute("data-original", tag.getAttribute("data"));
        tag.removeAttribute("data");
        tag.removeAttribute("data-rendering");
        const { parentVariableValue, localVariableName } =
          this.#parseOperation(tag);
        const renderedContent = render(
          parentVariableValue,
          localVariableName,
          this.#tagChildren[tagId],
          tag
        );
        if (renderedContent) tag.innerHTML = renderedContent;
        return;
      }
      tag.removeAttribute("data-rendering");
      const { parentVariableValue, localVariableName } =
        this.#parseOperation(tag);
      const newlyRenderedContent = render(
        parentVariableValue,
        localVariableName,
        this.#tagChildren[tag.getAttribute("data-id")],
        tag
      );
      if (newlyRenderedContent) tag.innerHTML = newlyRenderedContent;
    });
  }
}
