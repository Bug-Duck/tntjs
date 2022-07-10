import { evaluate } from "runtime/GlobalEnvironment";
import {
  ObjectType,
  SymbolTable,
  VariableValueType,
} from "runtime/SymbolTable";
import { Renderer } from "./index";
import { Variable } from "../index";
import VTagRenderer from "./VTagRenderer";

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

  constructor(
    root: HTMLElement,
    symbolTable: SymbolTable,
    customRenderer?: ForTagCustomRenderer
  ) {
    this.#root = root;
    this.#symbolTable = symbolTable;
    this.#customRenderer = customRenderer;
    this.#tagChildren = {};
    this.defaultRenderer = this.defaultRenderer.bind(this);
  }

  #parseOperation(tag: Element) {
    const forOperation = tag
      .getAttribute("data-original")
      .split(" in ", 2);
    const localVariableName = forOperation[0],
      parentVariableName = forOperation[1];
    const parentVariableValue = evaluate(this.#symbolTable, parentVariableName);
    return { localVariableName, parentVariableValue };
  }

  #generateTagId() {
    return (Math.random() + 1).toString(36).substring(7);
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
    
    // clear previously rendered content
    parentElement.innerHTML = "";
    (parentVariable as Array<ParentVariableValue>).forEach((item) => {
      const customSymbolTable = new SymbolTable();
      const currentVariable = new Variable(
        customSymbolTable,
        localVariableName,
        ObjectType
      );
      const currentId = this.#generateTagId();
      currentVariable.setValue(item);
      // merge the global table to the inner table
      customSymbolTable.merge(this.#symbolTable, (oldValue) => oldValue);
      childElement.setAttribute("data-id", currentId);
      parentElement.appendChild(childElement.cloneNode(true));
      // inner variable renderer
      const customVTagRenderer = new VTagRenderer(parentElement.querySelector(`[data-id="${currentId}"]`), customSymbolTable);
      customVTagRenderer.render();
    });
  }

  render() {
    const forTags = this.#root.querySelectorAll("t-for");
    const render = this.#customRenderer ?? this.defaultRenderer;
    console.log(forTags);
    forTags.forEach((tag) => {
      const rendered = tag.getAttribute("data-rendered");
      if (rendered === null) {
        const tagId = this.#generateTagId();
        tag.setAttribute("data-rendered", "YES");
        tag.setAttribute("data-id", tagId);
        // store in a separate variable instead of in attributes
        this.#tagChildren[tagId] = tag.children[0];
        tag.setAttribute("data-original", tag.getAttribute("data"));
        tag.removeAttribute("data");
        const { parentVariableValue, localVariableName } =
          this.#parseOperation(tag);
        const renderedContent = render(
          parentVariableValue,
          localVariableName,
          this.#tagChildren[tagId],
          tag
        );
        if (renderedContent) tag.innerHTML = renderedContent;
      }
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
