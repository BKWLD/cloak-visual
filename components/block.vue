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

<style lang='stylus' scoped></style>
