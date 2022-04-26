import { join } from 'path'
import { setPublicDefaultOptions } from '@cloak-app/utils'
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
		blockMaxWidthClass: 'max-w'
	})
}

// Required for published modules
module.exports.meta = require('./package.json')
