/**
 * file: VTagRenderer.ts
 * creator: 27Onion
 * create time: May 4th, 2022, 8:15
 * description: Renderer for the V tag.
 */

export const defaultRenderer = (s: string): string => {
  try {
    return `${Globals.evaluate(s)}`;
  } catch (e) {
    return `Error while rendering element: ${e}`;
  }
};

export const render = (customRenderer?: (vTagContent: string) => string) => {
  const vTags = document.querySelectorAll("v");
  const renderer = customRenderer ?? defaultRenderer;
  for (const tag of vTags) {
    const rendered = tag.getAttribute("data-rendered");
    if (rendered === null) {
      // Not rendered
      // In this case, the tag always should be rendered.
      tag.setAttribute("data-rendered", "YES");
      tag.setAttribute("data-original", tag.innerHTML);
      tag.innerHTML = customRenderer?.(tag.innerHTML) ?? defaultRenderer(tag.innerHTML);
      return;
    }
    // Already rendered
    // In this case, we should check if the tag really should be rendered or not.
    // This is called the DIFF CHECK
    const content = tag.getAttribute("data-original");
    const newRenderedContent = renderer(content);
    // Compare if the element should be rerendered.
    if (tag.innerHTML !== newRenderedContent) {
      tag.innerHTML = newRenderedContent;
    }
  }
};
