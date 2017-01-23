const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProd = process.env.NODE_ENV === "production"
const out = path.join(__dirname, "dist");

const plugins = [
	new HtmlWebpackPlugin({
		filename: path.join(__dirname, "dist", "index.html"),
		template: path.join(__dirname, "index_template.html"),
		inject: "body"
	}),
];
if (isProd) {
	plugins.push(
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
			},
			output: {
				comments: false
			},
		})
	);
} else {
	plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);
}

module.exports = {
	entry: path.join(__dirname, "index.js"),
	output: {
		path: out,
		filename: "demo.js"
	},
	devtool: isProd ? "eval-cheap-module-source-map" : "source-map",
	module: {
		rules: [
        	{ test: /\.(glsl|vert|frag)$/, loader: "shader-loader" },
		],
		loaders: [
			{
				test: /\.js?$/,
				include: [
					path.join(__dirname, "node_modules", "src")
				],
				loader: "babel-loader"
			},
			{
				enforce: "pre", 
				test: /\.js$/,  
				loader: "eslint-loader", 
				exclude: /node_modules/
			}
		]
	},
	plugins,
	resolve: {
		extensions: [".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
		modules: [
			path.resolve(__dirname, "node_modules"),
			out
		]
	},
	performance: {
		hints: isProd ? false : "warning"
	},
	devServer: {
		contentBase: './dist/',
		historyApiFallback: true,
		port: 3000,
		compress: isProd,
		inline: !isProd,
		hot: !isProd,
		stats: {
			assets: true,
			children: false,
			chunks: false,
			hash: false,
			modules: false,
			publicPath: false,
			timings: true,
			version: false,
			warnings: true,
			colors: {
				green: '\u001b[32m',
			}
		}
	}
};