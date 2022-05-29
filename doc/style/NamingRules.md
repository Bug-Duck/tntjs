# Naming Rules

## Overview
This documentation is about the naming rules.

## Properties
We don't allow **public fields**. Please use **getters and setters** with private fields instead. 

For private fields, use little pascal case with `prv_` prefix. Examples:
```typescript
prv_content: string;
prv_somethingStupid: object;
prv_whateverItIs: number;
```

## Methods (Including getters and setters)

Use little pascal case.

## Typenames (Enum, class, namespace etc.)

Use big pascal case, like
```typescript
class SomeClassName {}
```
