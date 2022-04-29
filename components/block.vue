<!-- Renders a visual block -->

<template lang='pug'>

section.visual-block(:class='classes')
	cloak-visual-responsive(v-bind='visualProps')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import ResponsiveVisual from './responsive'
export default

	# Support all responsive visual props
	props: {
		...ResponsiveVisual.props

		# Block props
		maxWidth:
			type: String
			default: -> @$config.cloak?.copy?.blockMaxWidth || ''
	}

	computed:

		# Root classes
		classes: -> @maxWidth # Expect to match a CSS class

		# Pass everything but block spcific props to visual instance
		visualProps: -> {
			...@$props
			sizes: '100vw'
			maxWidth: undefined
		}

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

// Make the image fill the block.  With most CMSs this is unnecessary because
// they provide image dimensions that are used to form the aspect and the
// presence of the aspect applies a similar rule.  This is a fallback for
// CMSs like @nuxt/content where we don't automatically have the aspect.
>>> .vv-asset
	width 100%

</style>
