/**
 * Helpers for working with images
 */

/**
 * Inject helpers globally
 */
export default function ({ $config, $img, app }, inject) {

	// Auto provide configuration options to img()
	inject('cloakImg', (url, modifiers, options) => {
		return img(url, modifiers, options, {
			$img,
			domains: $config.image.domains,
			defaultProvider: $config.image.provider,
		})
	})

	// Auto provide configuration options to srcset()
	const sizes = $config.cloak.visual.srcsetSizes
	inject('cloakSrcset', (url, modifiers, options) => {
		return srcset(url, sizes, modifiers, options, {
			$cloakImg: app.$cloakImg
		})
	})
}

/**
 * Passed options on to $img from @nuxt/image after some massaging
 */
export function img(url, modifiers, options = {}, {
	$img, domains, defaultProvider
}) {

	// If no URL passed, abort
	if (!url) return

	// Passthrough gifs without trying to format/compress them
	if (url.toLowerCase().endsWith(".gif")) return url;

	// If domains were provided, try and get just the image path
	if (domains) url = imgPath(domains, url)

	// If preset is empty, use the default preset for the provider
	if (!options.preset) {
		const provider = options.provider || defaultProvider
		if (provider == 'imgix') options.preset = 'imgix'
	}

	// Make the image
	return $img(url, modifiers, options)
}

/**
 * Remove the origin from a URL if it's domain is in one of the @nuxt/image
 * remote domains
 */
function imgPath(domains, url) {

	// Support urls like "//domain.com/path" by prepending https protocol
	if (url.match(/^\/\//)) url = 'https:' + url

	// Return the path if the url matches one of the allowed domains
	let urlObj
	try { urlObj = new URL(url) }
	catch (e) { return url }
	if (domains.includes(urlObj.hostname)) {
		return urlObj.pathname + urlObj.search
	}

	// Else passthrough the URL
	return url
}

/**
 * Make srcset given an array of sizes (widths).  I'm not using the
 * $img.getSizes helper because I don't like how it's `sizes` option works.
 * I want to allow `sizes` to be set using the native API.
 */
export function srcset(url, sizes, modifiers, options, {
	$cloakImg, maxWidth
} = {}) {
	if (!url || !sizes) return

	// Don't generate srcset for GIF
	if (url.toLowerCase().endsWith('.gif')) return

	// Don't output src options that are greater then a 2X version of the max
	// width
	if (maxWidth) {
		maxWidth = 2 * parseInt(maxWidth)
		sizes = sizes.filter(size => size <= maxWidth)
	}

	// Make array of srcsets. Only encode the URL if it's not already encoded.
	// I'm using decodeURIComponent rather than decodeURI so that it also tries
	// to decode `@` symbols, which I found encoded in some image paths.
	return sizes.map(size => {
		const sizedUrl = $cloakImg(url, { ...modifiers, width: size }, options)
		const encodedUrl = decodeURIComponent(sizedUrl) == sizedUrl ?
			encodeURI(sizedUrl) : sizedUrl
		return `${encodedUrl} ${size}w`
	}).join(', ')
}
