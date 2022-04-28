# @cloak-app/visual

Adpaters for vue-visual using [@nuxt/image](https://image.nuxtjs.org).

- [View demo](https://cloak-visual.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-visual)

## Install

1. Install with `yarn add @cloak-app/visual`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/visual']`

Also, you'll likely want to add a provider to [@nuxt/image](https://image.nuxtjs.org/api/options) as well.  Here is an example configuration using `imgix` with a source images uploaded to a different domain (like if we were using DigitalOcean Spaces for image storage).

```js
// nuxt.config.js
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

### Project Dependencies

- `.max-w*` styles (included in Cloak via `whitespace.styl`)

### Module Options

- `cloak.visual:`
  - `placeholderColor` - Sets the [`vue-visual` `placeholder-color`](https://github.com/BKWLD/vue-visual#loading). Defaults to `rgba(0,0,0,.2)`.
  - `srcsetWidths` - An array of viewport widths that will be used to make `srcset` values from.  Defaults to `[1920, 1440, 1024, 768, 425, 210]`.
  - `maxWidthClass` - The default max-width class to use for the block.

## Usage

### Components

`<cloak-visual />`

Renders a `vue-visual` instance using Cloak defaults.

- props:
  - `provider` - Use a specific @nuxt/image provider rather than [the default](https://image.nuxtjs.org/api/options#provider)
  - `preset` - Use a specific [@nuxt/image preset](https://image.nuxtjs.org/api/options#presets)
  - `natural` - Set width and height to natural size
  - `no-upscale` - Use image's width as a max-width
  - `no-placeholder` - Clear placeholder color, like for logos.  The placeholder is automatically isabled
  - ... all other [`vue-visual` props](https://github.com/BKWLD/vue-visual)

`<cloak-visual-responsive />`

Conditionally render landscape or portrait Visual instances.

- props:
  - `landscape-image` - Image shown on landscape orientation viewports
  - `portrait-image` - Image shown on landscape orientation viewports
  - ... all other `cloak-visual` props

`<cloak-visual-block />`

The block component simply renders a 100% width Visual within the max-width gutters using the default @nuxt/image provider.

- props:
  - `maxWidthClass` - A `max-w-*` class to apply to the block
  - ... all other `cloak-visual-responsive` props

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).
