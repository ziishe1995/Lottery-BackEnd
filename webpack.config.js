var webpack = require('webpack')
var path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
var resolve = dir => {
	return path.join(__dirname, dir)
}

module.exports = {
	resolve: {
		extensions: ['.ts', '.js', '.vue', '.json'],
		modules: [resolve('src'), resolve('node_modules')],
		alias: {
			'~': resolve('node_modules'),
			common: resolve('common'),
			'c@': resolve('common/components'),
			src: resolve('src'),
			lib: resolve('src/lib'),
			config: resolve('src/config'),
			constants: resolve('src/constants'),
			mixins: resolve('src/mixins'),
			module: resolve('src/store/module'),
			resource: resolve('resource'),
			'@': resolve('src/components'),
			pages: resolve('src/pages'),
			router: resolve('src/router'),
		},
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			_: 'lodash',
			moment: 'moment',
			axios: 'axios',
		}),
		new CopyPlugin([{ from: 'resource', to: 'resource' }]),
	],
}
