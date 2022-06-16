###
Render a Responsive Visual from Craft assets
###
import CloakVisual from '../../components/visual'
export default
	functional: true

	# Support all the main Cloak Visual props
	props: {
		...CloakVisual.props

		# Support Craft assets that typically arrive as arrays. But also support
		# the case that the object is passed directly in
		image: Object | Array
		video: Object | Array
	}

	# Make the responsive component
	render: (create, { props, data }) ->

		# Get asset objects
		image = getAssetObject props.image
		video = getAssetObject props.video
		asset = image || video

		# Pass along to cloak-visual
		create 'cloak-visual', {
			...data
			props: {
				...props

				# Pass along props that are extrapolated from Craft data
				image: image?.url
				video: video?.url
				aspect: aspectRatioFromImage image
				alt: asset?.alt || asset?.title
				objectPosition: objectPositionFromImage image
			}
		}

# Craft returns assets in an array, so get the first asset in the list
getAssetObject = (asset) ->
	if Array.isArray asset
	then asset[0]
	else asset

# Get the aspect ratio if the asset exists
export aspectRatioFromImage = (asset) ->
	return unless asset?.width and asset?.height
	asset.width / asset.height

# Make a CSS object-position (like Vue Visual supports) from Craft's
# focal point feature
objectPositionFromImage = (asset) ->
	return unless asset?.focalPoint?.length == 2
	"#{asset?.focalPoint[0] * 100}% #{asset?.focalPoint[1] * 100}%"
