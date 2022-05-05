/**
 * file: Pluggable.ts
 * creator: 27Onion
 * create time: May 5th, 2022, 18:35
 * description: The plugin API.
 */

namespace TNT {
    export interface Renderable {
        render(): void;
    }
    export interface Plugin {
        get id(): string;
        get rendererList(): Array<Renderable>;
        onInit(): void;
    }
}
