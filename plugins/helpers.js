/**
 * Helpers for working with images
 */

// Inject helpers globally
export default function ({ $config, $img }, inject) {

	// Auto provide list of domains to removeImgOrigin
	inject('imgPath', url => {
		return imgPath($config.image.domains, url)
	})

	// Auto provide configuration options to srcset
	inject('srcset', (url, sizes, { options } = {}) => {
		return srcset(url, sizes || $config.cloak.visual.srcsetSizes, {
			$img,
			domains: $config.image.domains,
			...options,
		})
	})

}

// Remove the origin from a URL if it's domain is in one of the @nuxt/image
// remote domains
export function imgPath(domains, url) {
	url = new URL(url)
	if (domains.includes(url.hostname)) {
		return url.pathname + url.search
	}
	return url
}

// Make srcset given an array of sizes (widths).  I'm not using the
// $img.getSizes helper because I don't like how it's `sizes` option works.
// I want to allow `sizes` to be set using the native API.
export function srcset(url, sizes, { $img, domains, maxWidth } = {}) {
	if (!url) return

	// If domains were provided, try and get just the image path
	if (domains) url = imgPath(domains, url)

	// Don't output src options that are greater then a 2X version of the max
	// width
	if (maxWidth) {
		maxWidth = 2 * parseInt(maxWidth)
		sizes = sizes.filter(size => size <= maxWidth)
	}

	// Make array of srcsets
	return sizes.map(size => {
		return `${encodeURI($img(url, { width: size }))} ${size}w`
	}).join(', ')
}
