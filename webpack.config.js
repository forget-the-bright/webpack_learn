// 引入插件 ESLintPlugin 用于代码检查
const ESLintPlugin = require('eslint-webpack-plugin');
// 引入插件 HtmlWebpackPlugin 用于生成 HTML 文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入插件 css单独打包
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 引入插件 css压缩
// 该插件用于压缩 CSS 文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 引入插件 terser-webpack-plugin 用于压缩 JS 文件 生产环境下是默认使用的插件，这里为了演示自定义配置
// const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const os = require("os");
// cpu核数
const threads = os.cpus().length;
// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
    return [
        // 'style-loader', // 将 JS 字符串生成为 style 节点，把处理好的css commonJS插入到html中style标签中
        // 使用 MiniCssExtractPlugin.loader 替换 style-loader
        // 这样可以将 CSS 提取到单独的文件中，而不是将其注入到 DOM 中
        // 适用于生产环境，避免将 CSS 直接嵌入到 HTML
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        preProcessor,
    ].filter(Boolean);
};


module.exports = {
    // 开发模式
    mode: 'production',
    devtool: "source-map",
    // 入口文件
    entry: './src/main.js',
    // 输出规则
    output: {
        path: __dirname + '/dist', // 输出目录
        filename: 'static/js/main.js', // 入口文件输出路径
        chunkFilename: 'static/js/[name].chunk.js',
        assetModuleFilename: "static/media/[hash:8][ext][query]",
        clean: true, // 自动将上次打包目录资源清空
    },
    // 模块解析规则
    module: {
        // 模块规则（配置 loader）
        rules: [{
            // 使用oneOf 规则，匹配其中一个loader处理只有就结束，提高效率，不加oneOf会从上到下匹配所有的loader
            oneOf: [
                {
                    test: /\.css$/i,
                    // 使用多个 loader 处理 CSS 文件 执行顺序是从右到左，从下到上，
                    use: getStyleLoaders() // 使用 getStyleLoaders 函数获取处理 CSS 的 loader

                },
                {
                    test: /\.less$/i,
                    use: getStyleLoaders('less-loader')
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: getStyleLoaders('sass-loader')
                },
                {
                    test: /\.styl$/,
                    use: getStyleLoaders('stylus-loader')
                },
                {
                    test: /\.(png|jpe?g|gif|webp)$/,
                    type: "asset",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 15 * 1024 // 小于10kb的图片会被base64处理
                        }
                    },
                    // output 配置 assetModuleFilename 属性后下方配置可以省略
                    // generator: {
                    //     // 将图片文件输出到 static/imgs 目录中
                    //     // 将图片文件命名 [hash:8][ext][query]
                    //     // [hash:8]: hash值取8位
                    //     // [ext]: 使用之前的文件扩展名
                    //     // [query]: 添加之前的query参数
                    //     filename: "static/imgs/[hash:8][ext][query]",
                    // },
                },
                {
                    test: /\.(ttf|woff2?|map4|map3|avi)$/,
                    type: "asset/resource",
                     // output 配置 assetModuleFilename 属性后下方配置可以省略
                    // generator: {
                    //     filename: "static/media/[hash:8][ext][query]",
                    // },
                },
                {
                    test: /\.m?js$/,
                    exclude: __dirname + /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: "thread-loader", // 开启多进程
                            options: {
                                workers: threads, // 数量
                            },
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                // 使用 Babel 预设,这里传递给babel配置选项,当前也可以在外边添加配置参考 babel文档.
                                // presets: ['@babel/preset-env'],
                                cacheDirectory: true, // 开启babel编译缓存
                                cacheCompression: false, // 缓存文件不要压缩
                            },
                        }
                    ],
                },
            ]
        }]


    },
    // 开发服务器配置
    devServer: {
        static: false,
        compress: true,
        port: 9000,
        client: {
            // 在浏览器中显示编译错误或警告
            logging: 'error',
            //当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            overlay: {
                // 显示编译错误
                errors: true,
                // 显示编译警告
                warnings: false,
            },
            // 在浏览器中以百分比显示编译进度。
            progress: true,
        },
        hot: true, // 启用热模块替换 默认打开在webpack5但在webpack4 是默认关闭的，
        open: true, // 启动服务器后自动打开浏览器访问项目
    },
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            `...`,
            new CssMinimizerPlugin(),
        ],
        // 代码分割配置
        splitChunks: {
            chunks: "all", // 对所有模块都进行分割
            // 以下是默认值
            // minSize: 20000, // 分割代码最小的大小
            // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
            // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
            // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
            // maxInitialRequests: 30, // 入口js文件最大并行请求数量
            // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
            // cacheGroups: { // 组，哪些模块要打包到一个组
            //   defaultVendors: { // 组名
            //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
            //     priority: -10, // 权重（越大越高）
            //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            //   },
            //   default: { // 其他没有写的配置会使用上面的默认值
            //     minChunks: 2, // 这里的minChunks权重更大
            //     priority: -20,
            //     reuseExistingChunk: true,
            //   },
            // },
            // 修改配置
            cacheGroups: {
                // 组，哪些模块要打包到一个组
                // defaultVendors: { // 组名
                //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
                //   priority: -10, // 权重（越大越高）
                //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
                // },
                default: {
                    // 其他没有写的配置会使用上面的默认值
                    minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    // 插件配置
    plugins: [
        // 可以在这里添加插件
        new ESLintPlugin({
            // 指定检查的文件类型，默认是 .js, .jsx, .ts 和 .tsx
            extensions: ['js', 'jsx', 'ts', 'tsx'],

            // 指定检查文件的根目录
            context: __dirname + '/src',
            // 指定 ESLint 配置文件
            // 如果不指定，默认会在项目根目录查找 .eslintrc
            overrideConfigFile: __dirname + '/eslint.config.js',
            exclude: function () {
                // 排除 node_modules 目录
                //console.log("王浩",__dirname + '/node_modules/');
                return __dirname + '/node_modules/';
            }(),
            cache: true, // 启用缓存
            cacheLocation: __dirname + '/node_modules/.cache/.eslintcache', // 指定
            threads, // 开启多进程
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html', // 模板文件
            filename: 'index.html', // 输出文件名称和位置

        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/main.css",
        }),

        // 压缩图片
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        [
                            "svgo",
                            {
                                plugins: [
                                    "preset-default",
                                    "prefixIds",
                                    {
                                        name: "sortAttrs",
                                        params: {
                                            xmlnsOrder: "alphabetical",
                                        },
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        }),
    ]
}