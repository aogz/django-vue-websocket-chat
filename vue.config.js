const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    baseUrl: '/static/',
    configureWebpack: {   
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
            }),
            new BundleTracker({filename: './webpack-stats.json'}),
            new WriteFilePlugin(),
        ],
        // output: {
            // publicPath: '/static/',
        // }
    }
}
