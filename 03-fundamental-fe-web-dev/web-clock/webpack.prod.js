const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/** @type {import('webpack').Configuration} */
const config = {
	mode: 'production',
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
