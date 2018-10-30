var path = require('path')
var webpack = require('webpack')

module.exports = {
    // 开发环境使用这个入口文件
    // entry: './src/main.js',
    // 打包发布使用这个入口文件
    entry: './src/components/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'vue-cells.js',
        library: 'VueCells',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            }, {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.(png|jpg|gif|svg)$/,
            //     loader: 'file-loader',
            //     options: {
            //         limit: 10000,
            //         name: '[name].[ext]'
            //             // name: utils.assetsPath('img/[name].[hash:7].[ext]')
            //     }
            // },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            },
            // {
            //     test: /\.(gif|jpg|png)\??.*$/,
            //     loader: 'url-loader',
            //     query: {
            //         limit: 8192,
            //         name: '[name].[hash:7].[ext]'
            //     }
            // },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}