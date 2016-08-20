var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var config = {
    entry: [
        './src/index.jsx'
    ],
    output: {
        path: './build',
        publicPath:'./',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.png$/, loader: 'file-loader'},
            {test: /\.gif$/, loader: 'file-loader'},
            {test: /\.svg\??.*?$/, loader: 'file-loader?mimetype=image/svg+xml'},
            {test: /\.eot\??.*?$/, loader: 'file-loader'},
            {test: /\.ttf\??.*?$/, loader: 'file-loader?mimetype=application/octet-stream'},
            {test: /\.woff\d?\??.*?$/, loader: 'file-loader?mimetype=application/font-woff'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
    },
    plugins: [
        new webpack.ProvidePlugin({
            "jQuery": "jquery"
        }),
        new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))//,
    ],
    externals: [nodeModules]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;