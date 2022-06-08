/**
 * file: TagRenderer.ts
 * creator: 27Onion
 * create time: May 10th, 2022, 20:26
 * description: The tag renderer.
 */

import { Renderable } from "src/runtime/Pluggable";

export class TagRenderer implements Renderable {
  render() {
    const tags = document.querySelectorAll("tnt");

    tags.forEach((tag) => {
      // since the tag content has been protected, we need to use data-tnt-plugin-value-backup instead of innerHTML.
      // E.g:
      // const tagInnerHTML = tag.getAttribute("data-tnt-plugin-value-backup");

      // If the tag isn't hidden, hide it.
      if ((tag as HTMLElement).style.getPropertyValue("display") !== "none") {
        (tag as HTMLElement).style.setProperty("display", "none");
      }
    });
  }
}
