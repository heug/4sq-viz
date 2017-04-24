var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: ['./src/index.js','./src/index.scss'],
	target: 'node',
	externals: [nodeExternals()],
	output: { path: __dirname + '/src/dist', filename: 'bundle.js' },
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					compact: false,
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader','css-loader','sass-loader']
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /sinon.js$/,
				loader: "imports-loader?define=>false"
			}
		]
	},
	externals: [
		{
      'cheerio': 'window',
      'react/addons': true,
			'react/lib/ExecutionEnvironment': true,
			'react/lib/ReactContext': true
		}
	],
	resolve: {
		extensions: ['*','.js','.jsx']
	}
};
