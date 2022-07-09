# `TNT.Plugin`

## Overview
The interface that a plugin's main class must implement.

## Definition

```typescript
export interface Plugin {
    get id(): string;
    get rendererList(): Array<Renderable>;
    get tags(): Array<string>;
    get version(): string;
    dependencies?: string[];
    onInit(): void;
}
```
## Members

```typescript
get id(): string;
```
This method should return a string that represents the plugin. The id should be a string that only contains`abcdefghijklmnopqrstuvwxyz0123456789_`.  

```typescript
get rendererList(): Renderable[];
```
This method should return a list of renderers. TNT.js runtime will call the renderer if needed.

```typescript
get tags(): string[];
```
The method should return a list of tag names that should be protected. The tag name listed here will be protected before rendering. If you want to access the innerHTML of HTML tags with tag names listed here in the render method, please use `xxx.getAttribute('data-tnt-plugin-value-backup')` (where `xxx` is an HTML element object) instead of `xxx.innerHTML`.

```typescript
get version(): string;
```
This method should return a string that represents the version of the plugin.

```typescript
dependencies?: string[];
```
This field is optional. If your plugin depends on other plugins, you should add the ids of the plugins to this list.

```typescript
onInit(): void;
```
This method will be called when TNTRuntime has successfully loaded this plugin.
