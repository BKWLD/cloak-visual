# [@cloak-app/visual](https://github.com/BKWLD/cloak-visual)

## Base component

Renders a `vue-visual` instance using Cloak defaults.

<cloak-visual
  image='https://cloak-visual.netlify.app/landscape.jpg'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual>

```vue
<cloak-visual
  image='https://cloak-visual.netlify.app/landscape.jpg'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual>
```

## Responsive component

Conditionally render landscape or portrait visual instances.

<cloak-visual-responsive
  landscape-image='https://cloak-visual.netlify.app/landscape.jpg'
  portrait-image='https://cloak-visual.netlify.app/portrait.png'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-responsive>

```vue
<cloak-visual-responsive
  landscape-image='https://cloak-visual.netlify.app/landscape.jpg'
  portrait-image='https://cloak-visual.netlify.app/portrait.png'
  sizes='100vw'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-responsive>
```

## Block component

The block component simply renders a 100% width Visual within the max-width gutters.

<cloak-visual-block
  image='https://cloak-visual.netlify.app/landscape.jpg'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-block>

```vue
<cloak-visual-block
  image='https://cloak-visual.netlify.app/landscape.jpg'
  alt='Cyberpunk vibes demo image'>
</cloak-visual-block>
```
