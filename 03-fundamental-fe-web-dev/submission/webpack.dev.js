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
	}
};

module.exports = merge(common, config);
