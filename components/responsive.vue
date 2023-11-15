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

	head: ->
		return unless @isResponsiveImage and @preload

		return link: [
			{
				rel: 'preload'
				as: 'image'
				href: @landscapeImage
				imagesrcset: @makeSrcset @landscapeImage
				imagesizes: @sizes || ''
				media: '(orientation: landscape)'
			}
			{
				rel: 'preload'
				as: 'image'
				href: @portraitImage
				imagesrcset: @makeSrcset @portraitImage
				imagesizes: @sizes || ''
				media: '(orientation: portrait)'
			}
		]

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

		isResponsiveImage: -> !!(@landscapeImage and @portraitImage)

		# Make responsive style rules, if relavent
		responsiveAspectStyles: ->
			styles = {}
			if @landscapeAspect
			then styles['--landscape-aspect'] = @percentageAspect @landscapeAspect
			if @portraitAspect
			then styles['--portrait-aspect'] = @percentageAspect @portraitAspect
			return styles

		# If there are both landscape and portrait videos, wait till the page is
		# mounted to decide which to show.  This prevents issues with differences
		# between SSR and client. Otherwise, just use whichever we have.
		responsiveVideo: ->
			landscape = @landscape?.props.video
			portrait = @portrait?.props.video
			if @landscapeVideo and @portraitVideo
				return unless @mounted
				if @isLandscape then @landscapeVideo else @portraitVideo
			else @landscapeVideo || @portraitVideo

		# Make the image prop
		responsiveImage: ->
			if @landscapeImage and @portraitImage
			then @landscapeImage # Visual requires an image value
			else @landscapeImage || @portraitImage || @image

		# Make responsive sources
		responsiveSources: ->
			return unless @landscapeImage and @portraitImage
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

		# Return a fractional aspect as a CSS percentage
		percentageAspect: (aspect) -> "#{1 / aspect * 100}%"

		# Build the srcset using inheritted props
		makeSrcset: (source) ->
			{ provider, preset } = @$props
			@$cloakSrcset source, {}, { provider, preset }

	# Create a single Clocak Visual instance
	render: (create) ->
		# Don't pass preload to visual instance if we are adding responsive preload
		preload = if @isResponsiveImage then false else @$props.preload

		return create CloakVisual, {

			# Add classes
			class:
				'responsive-visual': true
				'has-landscape-aspect': @landscapeAspect
				'has-portrait-aspect': @portraitAspect

			# Add CSS variables for overriding the aspect ratio
			style: @responsiveAspectStyles

			props: {

				# Passthrough props
				...@$props

				# The calculated image and video values
				image: @responsiveImage
				video: @responsiveVideo

				# Clear props that were unique to this component
				landscapeImage: undefined
				landscapeVideo: undefined
				landscapeAspect: undefined
				portraitImage: undefined
				portraitVideo: undefined
				portraitAspect: undefined
				preload
			}

			# Provide responsive source elements
			scopedSlots: ['image-source']: =>
				@responsiveSources?.map (data) -> create 'source', data

		# Passthrough slot
		}, @$slots.default

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

// Helper method to expand the things that Visual's expand prop expands
expandVisual()
	:deep(.vv-wrapper)
	:deep(.vv-picture)
	:deep(.vv-asset)
		position absolute
		left 0
		top 0
		width 100%
		height 100%

// Apply the aspect ratio setting rules
applyAspectRatioRules(aspectVar)

	// Override shim aspect ratio, when a default aspect was passed to visual
	&.vv-has-aspect :deep(.vv-aspect-shim)
		padding-top var(aspectVar) !important

	// When no aspect was passed as a prop, set aspect via pseudo selector
	&:not(.vv-has-aspect)
		expandVisual()
		&:before
			content ''
			height 100%
			display inline-block
			padding-top var(aspectVar) !important

// Add landscape aspect ratio
.has-landscape-aspect
	@media(orientation landscape)
		applyAspectRatioRules(--landscape-aspect)

// Add portrait aspect ratio
.has-portrait-aspect
	@media(orientation portrait)
		applyAspectRatioRules(--portrait-aspect)

</style>
