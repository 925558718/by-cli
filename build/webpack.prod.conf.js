const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const utils=require('./utils')
const path = require('path')
const config=require('../config')
const webpack=require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const env = process.env.NODE_ENV === 'testing'
? require('../config/test.env')
: require('../config/prod.env')
const webpackConfig=merge(baseWebpackConfig,{
    mode:'production',
    module:{
        rules:utils.styleLoaders({
            sourceMap:config.build.productionSourceMap,
            extract:true,
            usePostCSS:true
        }),
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output:{
        path:config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env':env
        }),
        
        new OptimizeCSSPlugin({
            cssProcessorOptions:config.build.productionSourceMap
            ?{safe: true, map: {inline: false}}
            :{safe: true}
        }),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath("css/[name].css"),
            chunkFilename: utils.assetsPath("css/[id].css")
        }),
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV==='testing'
            ? 'index.html':
             config.build.index,
             template: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname,'../static'),
                    to: config.build.assetsSubDirectory,
                }
            ]
        })

    ],
    optimization: {
        // async 异步(import()语法) initial(同步import xxx from 'xxx') all(所有)
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'initial',
                    priority: 10
                },
                react: {
                    name: 'reactBase',
                    test: (module) => {
                        return /react|react-dom|prop-types/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 100
                }
            }
        },
        minimizer:[
            new UglifyJsPlugin({
                sourceMap:config.build.productionSourceMap,
                parallel:true
            })
        ]
    }
})

if(config.build.productionGzip){
    const CompressionWebpackPlugin=require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}
if(config.build.bundleAnalyzerReport){
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports=webpackConfig;