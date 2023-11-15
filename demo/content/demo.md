# [@cloak-app/visual](https://github.com/BKWLD/cloak-visual)

## Base component

Renders a `vue-visual` instance using Cloak defaults.  When deployed to Netlify,this uses [the `netlify` provider](https://image.nuxtjs.org/providers/netlify) to produce a srcset.

The `preload` attribute has been added here since this image is above the fold.

<cloak-visual
  preload
  image='/assets/landscape.jpg'
  alt='Cyberpunk vibes demo image'
  sizes='(max-width: 1062px) 1062px; 100vw'>
</cloak-visual>

```vue
<cloak-visual
  preload
  image='/assets/landscape.jpg'
  alt='Cyberpunk vibes demo image'
  sizes='(max-width: 1062px) 1062px; 100vw'>
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
  image='/assets/landscape.jpg'
  :landscape-aspect='3/1'
  :portrait-aspect='2/1'
  provider='imgix'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-responsive>

```vue
<cloak-visual-responsive
  image='/assets/landscape.jpg'
  :landscape-aspect='16/9'
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

## Craft Visuals

Use the Craft adapter components to render Visual instances from Craft objects.  This example shows using `<responsive-craft-visual>` using a SuperTable image and video fields, where only one landscape image was provided. As a result, a non-responsive `<cloak-visual>` component is rendered.

<responsive-craft-visual
  :image='[{
    "id":"7884",
    "landscape":[{
      "id":"1193",
      "width":1324,
      "height":745,
      "title":"Retreat",
      "mimeType":"image/jpeg",
      "focalPoint":[0.5,0.5],
      "path":"retreat.jpg",
      "url":"/assets/landscape.jpg"
    }],
    "portrait":[]
  }]'>
</responsive-craft-visual>

```vue
<responsive-craft-visual
  :image='[{
    "id":"7884",
    "landscape":[{
      "id":"1193",
      "width":3840,
      "height":2160,
      "title":"Retreat",
      "mimeType":"image/jpeg",
      "focalPoint":[0.5,0.5],
      "url":"/assets/landscape.jpg"
    }],
    "portrait":[]
  }]'>
</responsive-craft-visual>
```

However, if multiple asssets are provided, a `<cloak-responsive>` instance is rendered:

<responsive-craft-visual
  :image='[{
    "id":"7884",
    "landscape":[{
      "id":"1193",
      "width":3840,
      "height":2160,
      "title":"Retreat",
      "mimeType":"image/jpeg",
      "focalPoint":[0.5,0.5],
      "url":"/assets/landscape.jpg"
    }],
    "portrait":[{
      "id":"1193",
      "width":2160,
      "height":2160,
      "title":"Retreat",
      "mimeType":"image/jpeg",
      "focalPoint":[0.5,0.5],
      "url":"/assets/portrait.png"
    }]
  }]'>
</responsive-craft-visual>

```vue
<responsive-craft-visual
  :image='[{
    "id":"7884",
    "landscape":[{
      "id":"1193",
      "width":3840,
      "height":2160,
      "title":"Retreat",
      "mimeType":"image/jpeg",
      "focalPoint":[0.5,0.5],
      "url":"/assets/landscape.jpg"
    }],
    "portrait":[{
      "id":"1193",
      "width":2160,
      "height":2160,
      "title":"Retreat",
      "mimeType":"image/jpeg",
      "focalPoint":[0.5,0.5],
      "url":"/assets/portrait.png"
    }]
  }]'>
</responsive-craft-visual>
```

## Sanity Visual

Here's an example of the `<sanity-visual>` adapter.

<sanity-visual
  :image='{
    "_type":"image",
    "alt": "Sanity example image",
    "asset": {
      "_id": "image-c19d82f29faceae87bcf7e9cd18b08291f59f11b-3840x2160-jpg",
      "url": "https://cdn.sanity.io/images/rnb0s8f2/production/c19d82f29faceae87bcf7e9cd18b08291f59f11b-3840x2160.jpg",
      "metadata": {
        "dimensions": {
          "aspectRatio": 1.7777777778,
        }
      }
    }
  }'>
</sanity-visual>

```vue
<sanity-visual
  :image='{
    "_type":"image",
    "alt": "Sanity example image",
    "asset": {
      "_id": "image-c19d82f29faceae87bcf7e9cd18b08291f59f11b-3840x2160-jpg",
      "url": "https://cdn.sanity.io/images/rnb0s8f2/production/c19d82f29faceae87bcf7e9cd18b08291f59f11b-3840x2160.jpg",
      "metadata": {
        "dimensions": {
          "aspectRatio": 1.7777777778,
        }
      }
    }
  }'>
</sanity-visual>
```
