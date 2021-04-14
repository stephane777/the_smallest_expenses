const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
	entry: {
		main: "./src/index.js",
	},
	resolve: {
		extensions: [".js", ".jsx"],
		fallback: {
			fs: false,
		},
	},

	plugins: [new NodePolyfillPlugin()],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[hash].[ext]",
						outputPath: "imgs",
					},
				},
			},
		],
	},
};
