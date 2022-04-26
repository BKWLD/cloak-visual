# @cloak-app/visual

Adpaters for vue-visual using @nuxt/image.

- [View demo](https://cloak-visual.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-visual)

## Install

1. Install with `yarn add @cloak-app/visual`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/visual']`

### Project Dependencies

- `.max-w*` styles (included in Cloak via `whitespace.styl`)

### Module Options

- `cloak.visual:`
  - `maxWidthClass` - The default max-width class to use for the block.

## Usage

### Components

`<cloak-visual-block />`

Renders a Block to be used within a Tower.

- props:
  - `maxWidthClass` - A `max-w-*` class to apply to the block

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).
