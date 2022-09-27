const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		clean: true
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				defaultVendors: {
					filename: '__scripts/[name].am.js'
				}
			}
		}
	},
	context: __dirname,
	module: {
		rules: [
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
	}
};

module.exports = merge(common, config);
