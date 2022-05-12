# `TNT.Renderable`

## Overview
The interface that plugins' renderer classes must implement.

## Definition

```typescript
export interface Renderable {
    render(): void;
}
```
## Members

```typescript
render(): void;
```
This method will be called when the runtime's renderer has been triggered (e.g. The symbol table has been updated).
