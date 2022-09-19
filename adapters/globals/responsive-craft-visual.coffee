###
Render Responsive Visual where the responsive fields come from Craft
###
import CloakResponsiveVisual from '../../components/responsive'
import CloakVisual from '../../components/visual'
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

	# Make the visual component
	render: (create, { props, data }) ->

		# Get props that responsive visual expects
		props =	{
			...props
			...expandSuperTableAssets props
		}

		# Render a responsive visual if at least one of the responsive props has
		# values for both landscape and portarit
		if (props.landscapeImage and props.portraitImage) ||
			(props.landscapeVideo and props.portraitVideo) ||
			(props.landscapeAspect and props.portraitAspect)
		then create CloakResponsiveVisual, {
			...data
			props: {
				...props

				# Remove Super Table field values now that they've been mapped
				image: undefined
				video: undefined
			}
		}

		# Otherwsie, render a standard cloak-visual
		else create CloakVisual, {
			...data
			props: {
				...props
				image: props.landscapeImage || props.portraitImage
				video: props.landscapeVideo || props.portraitVideo
				aspect: props.landscapeAspect || props.portraitAspect || props.aspect

				# Remove responsive field values
				landscapeImage: undefined
				portraitImage: undefined
				landscapeVideo: undefined
				portraitVideo: undefined
				landscapeAspect: undefined
				portraitAspect: undefined
			}
		}

# Take an object with image and video fields from our Super Table pattern and
# expand it into the more generic props that the responsive component expects
export expandSuperTableAssets = ({
	image, video, landscapeAspect, portraitAspect
}) ->

	# Access the Super Table objects that contain the actual asset objects
	landscapeImage = (image?[0] || image)?.landscape?[0]
	portraitImage = (image?[0] || image)?.portrait?[0]
	landscapeVideo = (video?[0] || video)?.landscape?[0]
	portraitVideo = (video?[0] || video)?.portrait?[0]

	# Use the first asset value found for shared values
	asset = landscapeImage || portraitImage || landscapeVideo || portraitVideo

	# Make an object with the keys of cloak-visual-responsive where values
	# are non-empty. If an explicit aspect was passed in, use it instead of the
	# value we read from the image object.
	{
		...mergeIf 'landscapeImage', landscapeImage?.url
		...mergeIf 'landscapeVideo', landscapeVideo?.url
		...mergeIf 'landscapeAspect', landscapeAspect ||
			aspectRatioFromImage landscapeImage

		...mergeIf 'portraitImage', portraitImage?.url
		...mergeIf 'portraitVideo', portraitVideo?.url
		...mergeIf 'portraitAspect', portraitAspect ||
			aspectRatioFromImage portraitImage

		...mergeIf 'alt', asset?.alt || asset?.title
	}

# Return an object that can be merged if the value is not undefined. This is
# a little utility to make the code more readable
mergeIf = (key, value) -> { [key]: value } if value

