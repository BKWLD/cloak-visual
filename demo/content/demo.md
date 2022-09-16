# [@cloak-app/visual](https://github.com/BKWLD/cloak-visual)

## Base component

Renders a `vue-visual` instance using Cloak defaults.  When deployed to Netlify,this uses [the `netlify` provider](https://image.nuxtjs.org/providers/netlify) to produce a srcset.

<cloak-visual
  image='/assets/landscape.jpg'
  alt='Cyberpunk vibes demo image'>
</cloak-visual>

```vue
<cloak-visual
  image='/assets/landscape.jpg'
  alt='Cyberpunk vibes demo image'>
</cloak-visual>
```

## Support @nuxt/image providers

This uses an explicit `imgix` provider to produce a `srcset` using `@cloak-app/visual`'s default `srcsetSizes` option.  Typically you *wouldn't* explicitly set the `provider` on each instance but would set as [the default provider](https://image.nuxtjs.org/api/options#provider).  Now that we're generating a `srcset` you should also remember to specify a `sizes` value.

<cloak-visual
  image='/assets/landscape.jpg'
  provider='imgix'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual>

```vue
<cloak-visual
  image='/assets/landscape.jpg'
  provider='imgix'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual>
```

## Responsive component

Conditionally render landscape or portrait visual instances using `imgix` to produce srcset crops.

<cloak-visual-responsive
  landscape-image='/assets/landscape.jpg'
  portrait-image='/assets/portrait.png'
  provider='imgix'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-responsive>

```vue
<cloak-visual-responsive
  landscape-image='/assets/landscape.jpg'
  portrait-image='/assets/portrait.png'
  provider='imgix'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-responsive>
```

The aspect ratio can be explicitly set through this component as well.

<cloak-visual-responsive
  landscape-image='/assets/landscape.jpg'
  :landscape-aspect='16/9'
  :portrait-aspect='4/3'
  provider='imgix'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-responsive>

```vue
<cloak-visual-responsive
  landscape-image='/assets/landscape.jpg'
  :landscape-aspect='16/9'
  :portrait-aspect='4/3'
  provider='imgix'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-responsive>
```

## Block component

The block component simply renders a 100% width Visual within the max-width gutters using the default `@nuxt/image` provider.  I'm using full URLs like would be returned from a CMS's storage. The domains of the CMS storage must be added to the `image.domains` array in your `nuxt.config`.

<cloak-visual-block
  landscape-image='https://cloak-visual.netlify.app/assets/landscape.jpg'
  portrait-image='https://cloak-visual.netlify.app/assets/portrait.png'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-block>

```vue
<cloak-visual-block
  lanlandscape-image='https://cloak-visual.netlify.app/assets/landscape.jpg'
  portrait-image='https://cloak-visual.netlify.app/assets/portrait.png'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-block>
```
