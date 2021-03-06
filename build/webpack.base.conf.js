const path = require('path')
const config = require('../config')
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css', '.stylus'],
        alias: {
            '@': resolve('src')
        },
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
    },
    node: {
        __dirname: false,
        __filename: false,
        global: false
    },
    module: {
        rules: [{
                test: /\.js|jsx$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }

                }],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            }
        ]
    }
}