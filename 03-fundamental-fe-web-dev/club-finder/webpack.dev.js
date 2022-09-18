const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/** @type {import('webpack').Configuration} */
const config = {
	mode: 'development',
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
