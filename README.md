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
  - `placeholderColor` - Sets the [`vue-visual` `placeholder-color`](https://github.com/BKWLD/vue-visual#loading). Defaults to `rgba(0,0,0,.2)`.
  - `srcsetWidths` - An array of viewport widths that will be used to make `srcset` values from.  Defaults to `[1920, 1440, 1024, 768, 425, 210]`.
  - `maxWidthClass` - The default max-width class to use for the block.

Also, you'll likely want to [configure @nuxt/image](https://image.nuxtjs.org/api/options) as well.  Here is an example configuration using `imgix`:

```
export default {
  image: {
    provider: 'imgix',
    domains: ['your-source.domain.com'],
    imgix: {
      baseURL: 'https://your-subdomain.imgix.net',
    }
  }
}
```

## Usage

### Components

`<cloak-visual-block />`

Renders a Block to be used within a Tower.

- props:
  - `maxWidthClass` - A `max-w-*` class to apply to the block

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).
