<!-- Renders a visual block -->

<template lang='pug'>

section.visual-block(:class='classes') Heya world

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	props:

		# The max-width class
		maxWidthClass:
			type: String
			default: -> @$config.cloak?.visual?.blockMaxWidthClass || ''

	computed:

		# Root classes
		classes: -> @maxWidthClass

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.visual-block
	border 1px dashed currentColor
	padding 1em
	margin-v 1em

</style>
