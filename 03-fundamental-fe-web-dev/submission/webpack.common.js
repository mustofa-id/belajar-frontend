const HtmlWebpackPlugin = require('html-webpack-plugin');
const UnoCSS = require('@unocss/webpack').default;
const { presetUno, presetIcons, transformerVariantGroup } = require('unocss');

/** @type {import('webpack').Configuration} */
const config = {
	entry: './src/app.js',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/app.html',
			filename: 'index.html'
		}),
		UnoCSS({
			preprocess: [
				presetUno(),
				presetIcons({
					extraProperties: {
						display: 'inline-block',
						'vertical-align': 'middle'
					}
				})
			],
			transformers: [transformerVariantGroup()],
			include: ['./**/*.html']
		})
	]
};

module.exports = config;
