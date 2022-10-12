const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

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
		new DefinePlugin({
			API_ANON: JSON.stringify(
				`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4emR3bXBqa2dvYXp0bmljZW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUzNjg1MjQsImV4cCI6MTk4MDk0NDUyNH0.0BqjxO_ghTtIvW0pvJRZH_PqxlYT4dUPb2tfS-Jca0o`
			),
			API_BASE_URL: JSON.stringify(`https://hxzdwmpjkgoaztniceoj.supabase.co`)
		}),
		new HtmlWebpackPlugin({
			template: './src/app.html',
			filename: 'index.html'
		})
	]
};

module.exports = config;
