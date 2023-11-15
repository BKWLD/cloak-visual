# Load Vue Visual
import Visual from 'vue-visual'
import 'vue-visual/index.css'

# Make the list of base Visual props, manually merging all mixins
baseProps = Visual.mixins.reduce (props, mixin) ->
	{ ...props, ...mixin.props }
, { ...Visual.props }

# Map Contentful image objects into params for visual
export default
	name: 'CloakVisual'
	functional: true

	# Get the index of the block this may be in
	inject: blockIndex: default: undefined

	props: {
		...baseProps

		# @nuxt/image props
		provider: String
		preset: String
		modifiers: Object

		# Support additional types
		aspect: Number | String | Boolean

		# Set width and height to natural size
		natural: Boolean

		# Use image's width as a max-width
		noUpscale: Boolean

		# Clear placeholder color, like for logos
		noPlaceholder: Boolean
		autoNoPlaceholder:
			type: Boolean
			default: true

		# Set base booleans to an undefined default so we can test whether they
		# were explicitly made false or are actually undefined
		preload:
			type: Boolean
			default: undefined
		lazyload:
			type: Boolean
			default: undefined
		autoplay:
			type: Boolean
			default: undefined
		autopause:
			type: Boolean
			default: undefined
		loop:
			type: Boolean
			default: undefined
		muted:
			type: Boolean
			default: undefined

		# Other types with default values in Vue Visual that we want to be able
		# to test for undefined-ness
		transition:
			type: String
			default: undefined
		intersectionOptions:
			type: Object
			default: undefined
	}

	# Render a Visual instance
	render: (create, {
		props, injections, data, children, scopedSlots, parent
	}) ->

		# Convert "16:9" style aspect to a number
		aspect = if props.aspect and
			typeof props.aspect == 'string' and
			dimensions = props.aspect?.match /^(\d+):(\d+)$/
			then dimensions[1] / dimensions[2]
		else props.aspect

		# If no asset but an aspect, still create the Visual instance which
		# becomes a placeholder space
		unless props.image or props.video
			return unless aspect or children
			return create Visual, { ...data, props: {
				aspect, placeholderColor
			} }, children

		# Use the width as the size if passed
		sizes = if !props.sizes and props.width
			if String(props.width).match /^\d+$/
			then "#{props.width}px" # If width a number, treat as "px"
			else props.width
		else props.sizes

		# Clear placeholder color if `no-placeholder` prop is set or if the image
		# is of a format that woulds support transparency.  The latter is handy
		# for product images.
		placeholderColor = unless props.noPlaceholder or
			(props.autoNoPlaceholder and props.image?.match /\.(png|svg)/i)
		then parent.$config.cloak.visual.placeholderColor

		# Disable lazy loading and enable preload automatically if found in 2
		# blocks. Written kinda weird so it defaults to true when blockIndex is
		# undefined. Also, disable lazyload automatically when preloading.
		isCriticalImage = injections.blockIndex < 2
		preload = props.preload ? isCriticalImage
		lazyload = props.lazyload ? not isCriticalImage && not preload

		# If transition is undefined and is a crticial image or lazy loading is
		# disabled, then disable transition so the visual doesn't begin as display
		# none, which would delay LCP.
		transition = props.transition ?
			if isCriticalImage or not lazyload
			then '' else undefined

		# Route the image through @nuxt/image.
		# https://image.nuxtjs.org/api/$img
		{ provider, preset, modifiers } = props
		image = parent.$cloakImg props.image, modifiers, { provider, preset }

		# Make a srceset using @nuxt/image unless sources were slotted in (they
		# will contain the srcet)
		srcset = switch
			when scopedSlots['image-source'] then undefined
			when props.srcset then props.srcset
			else parent.$cloakSrcset props.image, modifiers, { provider, preset }

		# Warn developers to specify a sizes prop
		if srcset and !sizes and process.env.APP_ENV == 'dev'
		then console.debug "No sizes prop for #{props.image}"

		# Instantiate a Visual instance
		create Visual, {
			...data
			props: {

				# Passthrough props by default
				...props

				# Image
				image
				srcset
				sizes

				# Video props that default to true
				autoplay: props.autoplay ? true
				loop: props.loop ? true
				muted: props.muted ? true

				# Layout
				aspect

				# Loading
				preload
				lazyload
				transition
				placeholderColor
				intersectionOptions: props.intersectionOptions ?
					rootMargin: '50% 0% 50% 0%'

		}}, children
