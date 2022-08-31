<!-- Conditionally render landscape or portrait visual instances -->

<script lang='coffee'>
import CloakVisual from './visual'
export default
	name: 'ResponsiveVisual'

	props: {

		# Merge cloak-visual props
		...CloakVisual.props

		# Landscape asset props
		landscapeImage: String
		landscapeVideo: String
		landscapeAspect: Number

		# Portrait asset props
		portraitImage: String
		portraitVideo: String
		portraitAspect: Number
	}

	data: ->
		mounted: false
		isLandscape: null

	mounted: ->
		@isLanscapeMediaQuery = window.matchMedia '(orientation: landscape)'
		@checkIsLandscape @isLanscapeMediaQuery
		@isLanscapeMediaQuery.addListener @checkIsLandscape
		@mounted = true

	destroyed: ->
		@isLanscapeMediaQuery?.removeListener @checkIsLandscape

	computed:

		# Visual configs
		landscape: -> @makeConfig @landscapeImage, @landscapeVideo
		portrait: -> @makeConfig @portraitImage, @portraitVideo

		# Do we have unique landscape and portrait configs?
		isResponsive: -> !!(@landscape and @portrait)

		# The config used when there is both landscape and portrait assets. The
		# video prop will only be set once the viewport can be measured.
		responsiveConfig: ->
			return unless @isResponsive
			{
				...@landscape
				props: {
					...@landscape.props
					video: @responsiveVideo
				}
				class: 'responsive-visual'
				style:
					'--landscape-aspect': @makeAspectStyle 'landscape'
					'--portrait-aspect': @makeAspectStyle 'portrait'
			}

		# If there are both landscape and portrait videos, wait till the page is
		# mounted to decide which to show.  This prevents issues with differences
		# between SSR and client. Otherwise, just use whichever we have.
		responsiveVideo: ->
			landscape = @landscape?.props.video
			portrait = @portrait?.props.video
			if landscape and portrait
				return unless @mounted
				if @isLandscape then landscape else portrait
			else landscape || portrait

		# Make responsive sources
		responsiveSources: ->
			return unless @isResponsive
			[
				{
					attrs:
						media: '(orientation: landscape)'
						srcset: @makeSrcset @landscapeImage
						sizes: @sizes
				}
				{
					attrs:
						media: '(orientation: portrait)'
						srcset: @makeSrcset @portraitImage
						sizes: @sizes
				}
			]

	methods:

		# Store whether orientation is currently landscape
		checkIsLandscape: (e) -> @isLandscape = e.matches

		# Make the aspect css style
		makeAspectStyle: (viewportType) ->
			return unless image = @[viewportType].props.image

			# Return explicitly passed in aspect
			if aspect = explicitAspect = @[viewportType + 'Aspect']
			then return @percentageAspect aspect

			# Make aspect from image if values are provided
			if typeof image == 'object' and image.width and image.height
			then return @percentageAspect image.width / image.height

		# Return a fractional aspect as a CSS percentage
		percentageAspect: (aspect) -> "#{1 / aspect * 100}%"

		# Make the config object for the create function by keeping all data and
		# props except for replacing landscape and portrait with the asset itself
		makeConfig: (image, video) ->
			return unless image or video
			on: loaded: => @$emit 'loaded'
			props: {
				...@$props
				image
				video
				landscapeImage: undefined
				landscapeAspect: undefined
				landscapeVideo: undefined
				portraitImage: undefined
				portraitAspect: undefined
				portraitVideo: undefined
			}

		# Build the srcset using inheritted props
		makeSrcset: (source) ->
			{ provider, preset } = @$props
			@$cloakSrcset source, {}, { provider, preset }

	# Make the appropriate visual instance
	render: (create) ->

		# Create visual for the current viewport width
		if @landscape || @portrait
			unless @isResponsive
			then create CloakVisual, @landscape || @portrait, @$slots.default
			else create CloakVisual, {
				...@responsiveConfig
				scopedSlots: ['image-source']: =>
					@responsiveSources.map (data) -> create 'source', data
			}, @$slots.default

		# No assets were discovered, so explicitly clear the asset props
		else create CloakVisual, { props: {
			...@$props
			image: undefined
			video: undefined
		}}, @$slots.default

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

// Add responsive aspect ratio
.responsive-visual :deep(.vv-aspect-shim)
	@media(orientation landscape)
		padding-top var(--landscape-aspect) !important
	@media(orientation portrait)
		padding-top var(--portrait-aspect) !important

</style>
