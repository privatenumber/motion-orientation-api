module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-css-modules',
	],

	rules: {
		indentation: 'tab',
		'value-keyword-case': ['lower', {
			ignoreProperties: ['composes'],
		}]
	},
};
