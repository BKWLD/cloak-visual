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
		blockMaxWidthClass: 'max-w',
		placeholderColor: 'rgba(0,0,0,.2)',
	})

	// Add @nuxt/image
	requireOnce(this, '@nuxt/image')
}

// Required for published modules
module.exports.meta = require('./package.json')
