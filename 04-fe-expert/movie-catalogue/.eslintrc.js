module.exports = {
	env: {
		es2021: true,
		node: true,
		browser: true
	},
	extends: 'standard',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		'import/no-extraneous-dependencies': 0,
		'no-console': 0,
		'no-underscore-dangle': 0,
		'no-restricted-globals': 0,
		'linebreak-style': 0
	}
};
