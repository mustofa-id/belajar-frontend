const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	mode: 'production',
	devServer: {
		client: {
			overlay: {
				errors: true,
				warnings: false
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			},
			{
				test: /\.js/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template.html',
			filename: 'index.html'
		})
	]
};

module.exports = config;
