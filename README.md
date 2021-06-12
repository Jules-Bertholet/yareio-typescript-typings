# TypeScript typings for yare.io

This repo contains TypeScript typings for [yare.io](https://yare.io/), a programming game where you use Javascript to control your game units (called "spirits") and try to kill the enemy base.

The recommended way to use these typings is via a Git submodule: 
1. First, in the root of your project, run `git submodule add https://github.com/Jules-Bertholet/yare-typescript-typings typings`. 
2. Second, update your `tsconfig.json` so that `typeRoots` is set to `["./typings", "./node_modules/@types"]` (you can add additional directories to the list in front of `typings` if you have your own types you want to have take precedence).
