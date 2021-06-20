const config = require('../config')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path);
}
exports.cssLoaders = function (options) {
    options = options || {};
    const styleLoader = {
        loader: 'style-loader',
    }
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap,
            postcssOptions: {

            },
            execute: false
        }
    }

    function generateLoaders(loader, loaderOptions) {
        const loaders = process.env.NODE_ENV !== 'production' ? [styleLoader, cssLoader] : [cssLoader];
        options.usePostCSS ? loaders.push(postcssLoader) : '';
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        if (options.extract) {
            loaders.unshift({
                loader: MiniCssExtractPlugin.loader,
                options: Object.assign({}, loaderOptions, {
                    publicPath: config.build.assetsPublicPath
                })
            })
        }
        return loaders
    }
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        stylus: generateLoaders('stylus')
    }
}
exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.cssLoaders(options);
    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output;
}