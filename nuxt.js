import { join } from 'path'
import { setPublicDefaultOptions, requireOnce } from '@cloak-app/utils'
import { defaultsDeep } from 'lodash'
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

	// Set default @cloak-app/visual options
	setPublicDefaultOptions(this, 'visual', {
		placeholderColor: 'rgba(0,0,0,.2)',
		srcsetSizes: [1920, 1440, 1024, 768, 425, 210],
		blockMaxWidth: 'max-w',
	})

	// Make @nuxt/image best practice presets
	defaultsDeep(this.options, {
		image: {
			presets: {

				// See https://image.nuxtjs.org/providers/imgix#imgix-best-practices
				imgix: {
					modifiers: {
						auto: 'format,compress',
						crop: 'faces',
					}
				}
			}
		}
	})

	// Add @nuxt/image
	requireOnce(this, '@nuxt/image')

	// Expose @nuxt/image config options to helpers
	defaultsDeep(this.options.publicRuntimeConfig, {
		image: {
			provider: this.options.image?.provider,
			domains: this.options.image?.domains || [],
		}
	})

	// Add helper methods
	this.addPlugin(join(__dirname, 'plugins/helpers.js'))
}

// Required for published modules
module.exports.meta = require('./package.json')
