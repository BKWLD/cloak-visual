// Nuxt config
export default {

	// Load boilerplate and this package's module
	buildModules: [
		'@cloak-app/boilerplate',
		'@cloak-app/demo-theme',
		'../nuxt',
	],

	// Cloak settings
	cloak: {

		// Boilerplate settings
		boilerplate: {
			siteName: '@cloak-app/visual demo',
		},

	},

	// Default to using imgix to generate srcsets
	image: {
		// provider: 'imgix', // On a non-demo site, this would be enabled
		domains: ['cloak-visual.netlify.app'],
		imgix: {
			baseURL: 'https://cloak-visual.imgix.net',
		},
	},

	// @nuxt/content can't be loaded from module
	modules: ['@nuxt/content'],
}
