const path = require('path');
const config =require('../config')
const resolve=path.resolve

module.exports = {
    entry: {
        app:'./src/index.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json','.jsx'],
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    module:{
        rules:[
            {
                test: /\.js|jsx$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }],
                exclude: /node_modules/
            },
        ]
    }
}