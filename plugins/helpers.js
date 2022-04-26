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

	// If domains were provided, try and get just the image path
	if (domains) url = imgPath(domains, url)

	// If preset is empty, use the default preset for the provider
	if (!options.preset) {
		const provider = options.provider || defaultProvider
		if (provider == 'imgix') options.preset = 'imgix'
	}

	// Make the imag
	return $img(url, modifiers, options)
}

/**
 * Remove the origin from a URL if it's domain is in one of the @nuxt/image
 * remote domains
 */
function imgPath(domains, url) {
	try { url = new URL(url) }
	catch (e) { return url }
	if (domains.includes(url.hostname)) {
		return url.pathname + url.search
	}
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

	// Don't output src options that are greater then a 2X version of the max
	// width
	if (maxWidth) {
		maxWidth = 2 * parseInt(maxWidth)
		sizes = sizes.filter(size => size <= maxWidth)
	}

	// Make array of srcsets
	return sizes.map(size => {
		const sizedUrl = $cloakImg(url, { ...modifiers, width: size }, options)
		return `${encodeURI(sizedUrl)} ${size}w`
	}).join(', ')
}
