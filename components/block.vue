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

		# The max-width class
		maxWidthClass:
			type: String
			default: -> @$config.cloak?.visual?.blockMaxWidthClass || ''
	}

	computed:

		# Root classes
		classes: -> @maxWidthClass

		# Pass everything but block spcific props to visual instance
		visualProps: -> {
			...@$props
			sizes: '100vw'
			maxWidthClass: undefined
		}

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped></style>
