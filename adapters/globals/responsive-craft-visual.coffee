###
Render Responsive Visual where the responsive fields come from Craft
###
import CloakResponsiveVisual from '../../components/responsive'
import { aspectRatioFromImage } from './craft-visual'
export default
	functional: true

	# Support all the main responsive props
	props: {
		...CloakResponsiveVisual.props

		# Also support Super Table fields
		image: Object | Array
		video: Object | Array
	}

	# Make the responsive component
	render: (create, { props, data }) ->
		create 'cloak-visual-responsive', {
			...data
			props: {
				...props

				# Consume Super Table props
				...expandSuperTableAssets props

				# Remove Super Table field values now that they've been mapped
				image: undefined
				video: undefined
			}
		}

# Take an object with image and video fields from our Super Table pattern and
# expand it into the more generic props that the responsive componet expects
export expandSuperTableAssets = ({ image, video }) ->

	# Access the Super Table objects that contain the actual asset objects
	landscapeImage = (image?[0] || image)?.landscape?[0]
	portraitImage = (image?[0] || image)?.portrait?[0]
	landscapeVideo = (video?[0] || video)?.landscape?[0]
	portraitVideo = (video?[0] || video)?.portrait?[0]

	# Use the first asset value found for shared values
	asset = landscapeImage || portraitImage || landscapeVideo || portraitVideo

	# Make an object with the keys of cloak-visual-responsive where values
	# are non-empty
	{
		...mergeIf 'landscapeImage', landscapeImage?.url
		...mergeIf 'landscapeVideo', landscapeVideo?.url
		...mergeIf 'landscapeAspect', aspectRatioFromImage landscapeImage

		...mergeIf 'portraitImage', portraitImage?.url
		...mergeIf 'portraitVideo', portraitVideo?.url
		...mergeIf 'portraitAspect', aspectRatioFromImage portraitImage

		...mergeIf 'alt', asset?.alt || asset?.title
	}

# Return an object that can be merged if the value is not undefined. This is
# a little utility to make the code more readable
mergeIf = (key, value) -> { [key]: value } if value

