# TypeScript typings for yare.io

This repo contains TypeScript typings for [yare.io](https://yare.io/), a programming game where you use Javascript to
control your game units (called "spirits") and try to kill the enemy base.

The recommended way to use these typings is via a Git submodule:

1. First, in the root of your project, run
`git submodule add https://github.com/Jules-Bertholet/yareio-typescript-typings typings`.
2. Second, update your `tsconfig.json` so that `typeRoots` is set to `["./typings", "./node_modules/@types"]` (you can
add additional directories to the list in front of `typings` if you have your own types you want to have take
precedence).

## Shape-specific methods

These typings are designed to allow writing a bot that can play any shape. If you always play the same shape, you can
add a declaration to make your life easier:

```typescript
declare const my_spirits: CircleSpirit[];
```
