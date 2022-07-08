/**
 * file: Pluggable.ts
 * creator: 27Onion
 * create time: May 5th, 2022, 18:35
 * description: The plugin API.
 */


export interface Renderable {
  root?: HTMLElement;
  render(): void;
}

export interface Plugin {
  get id(): string;
  get rendererList(): Renderable[];
  get tags(): string[];
  get version(): string;
  root?: HTMLElement;
  dependencies: string[];
  onInit(): void;
}
