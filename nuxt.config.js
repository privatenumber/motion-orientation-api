
export default {
	/*
	** Nuxt rendering mode
	** See https://nuxtjs.org/api/configuration-mode
	*/
	mode: 'spa',
	/*
	** Nuxt target
	** See https://nuxtjs.org/api/configuration-target
	*/
	target: 'static',
	/*
	** Headers of the page
	** See https://nuxtjs.org/api/configuration-head
	*/
	head: {
		title: 'Motion & Orientation API explorer',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
			},
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		]
	},
	/*
	** Global CSS
	*/
	css: [
	],
	/*
	** Plugins to load before mounting the App
	** https://nuxtjs.org/guide/plugins
	*/
	plugins: [
	],
	/*
	** Auto import components
	** See https://nuxtjs.org/api/configuration-components
	*/
	components: true,
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		// '@nuxtjs/eslint-module',
		// Doc: https://github.com/nuxt-community/stylelint-module
		// '@nuxtjs/stylelint-module'
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/pwa'
	],
	/*
	** Build configuration
	** See https://nuxtjs.org/api/configuration-build/
	*/
	build: {
		postcss: {
			plugins: {
				'postcss-preset-env': {
					stage: 0
				}
			}
		}
	}
}
