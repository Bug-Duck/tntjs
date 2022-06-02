/**
 * file: TagRenderer.ts
 * creator: 27Onion
 * create time: May 10th, 2022, 20:26
 * description: The tag renderer.
 */

namespace TNTScript {
    export class TagRenderer implements TNT.Renderable {

        render() {
            // Render phase.

            // 1. Get all the tags.
            const tags = document.querySelectorAll("tnt");

            // 2. Iterate each tag.
            for (const tag of tags) {
                // 3. Check this tag.
                // 'cause the tag content has been protected, we use data-tnt-plugin-value-backup instead of innerHTML.
                const tagInnerHTML = tag.getAttribute("data-tnt-plugin-value-backup");

                // If the tag isn't hidden, the hide it.
                if ((tag as HTMLElement).style.getPropertyValue("display") !== "none") {
                    (tag as HTMLElement).style.setProperty("display", "none");
                }
            }
        }
    }
}
