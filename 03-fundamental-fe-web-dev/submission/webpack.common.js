const HtmlWebpackPlugin = require('html-webpack-plugin');

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
		})
	]
};

module.exports = config;
