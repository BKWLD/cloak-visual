<!-- Renders a visual block -->

<template lang='pug'>

section.visual-block(:class='classes')
	cloak-visual(
		:image='image'
		:alt='alt'
		sizes='100vw')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	props:

		image: String

		# Alt text is common for all assets
		alt: String

		# Make explicit landscape and portrait props that expect
		# landscapeImage: String
		# portraitImage: String
		# landscapeVideo: String
		# portraitVideo: String

		# The max-width class
		maxWidthClass:
			type: String
			default: -> @$config.cloak?.visual?.blockMaxWidthClass || ''

	computed:

		# Root classes
		classes: -> @maxWidthClass

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped></style>
