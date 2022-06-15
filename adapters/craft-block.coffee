###
Render a Craft "Media Asset" block containing data for a responsive Visual
###
export default

	functional: true
	props: block: Object

	render: (create, { props: { block }, data }) ->

		# Access the objects that contain the actual asset objects
		landscapeImage = block.image?[0]?.landscape?[0]
		portraitImage = block.image?[0]?.portrait?[0]
		landscapeVideo = block.video?[0]?.landscape?[0]
		portraitVideo = block.video?[0]?.portrait?[0]

		# Use the first asset value found for common values like aspect or alt
		asset = landscapeImage || portraitImage || landscapeVideo || portraitVideo

		# Render the share block component
		create 'cloak-visual-block', {
			...data
			props:

				# Block settings
				maxWidth: block.maxWidth

				# The image assets whose URLs will route through @nuxt/image
				landscapeImage: landscapeImage?.url
				portraitImage: portraitImage?.url
				landscapeVideo: landscapeVideo?.url
				portraitVideo: portraitVideo?.url

				# Aspect ratios
				lanscapeAspect: aspectRatio landscapeImage
				portraitAspect: aspectRatio portraitImage

				# Shared values
				alt: asset.alt || asset.title

		}

# Get the aspect ratio if the asset exists
aspectRatio = (asset) ->
	return unless asset and asset.width and asset.height
	asset.width / asset.height
