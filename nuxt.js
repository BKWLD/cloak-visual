import { join } from 'path'
import { setPublicDefaultOptions, requireOnce } from '@cloak-app/utils'
export default function() {

	// Have Nuxt transpile resources
	this.options.build.transpile.push('@cloak-app/visual')

	// Allow components to be auto-imported by Nuxt
	this.nuxt.hook('components:dirs', dirs => {
		dirs.push({
			path: join(__dirname, './adapters'),
			extensions: ['js', 'coffee'],
			prefix: 'cloak-visual',
			level: 2,
		})
		dirs.push({
			path: join(__dirname, './components'),
			extensions: ['vue', 'js', 'coffee'],
			prefix: 'cloak-visual',
			level: 2,
		})
	})

	// Set default options
	setPublicDefaultOptions(this, 'visual', {
		placeholderColor: 'rgba(0,0,0,.2)',
		srcsetSizes: [1920, 1440, 1024, 768, 425, 210],
		blockMaxWidthClass: 'max-w',
	})

	// Add @nuxt/image
	requireOnce(this, '@nuxt/image')

	// Add helper methods
	this.addPlugin(join(__dirname, 'plugins/helpers.js'))

	// Add image domains to config for use in helper methods
	this.options.publicRuntimeConfig = {
		...this.options.publicRuntimeConfig,
		image: {
			domains: this.options.image?.domains || [],
			...this.options.publicRuntimeConfig.image
		}
	}
}

// Required for published modules
module.exports.meta = require('./package.json')
