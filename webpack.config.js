// 引入插件 ESLintPlugin 用于代码检查
const ESLintPlugin = require('eslint-webpack-plugin');
// 引入插件 HtmlWebpackPlugin 用于生成 HTML 文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入插件 css单独打包
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 引入插件 css压缩
// 该插件用于压缩 CSS 文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
    // 入口文件
    entry: './src/main.js',
    // 输出规则
    output: {
        path: __dirname + '/dist', // 输出目录
        filename: 'static/js/main.js', // 入口文件输出路径
        clean: true, // 自动将上次打包目录资源清空
    },
    // 模块解析规则
    module: {
        // 模块规则（配置 loader）
        rules: [
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
                generator: {
                    // 将图片文件输出到 static/imgs 目录中
                    // 将图片文件命名 [hash:8][ext][query]
                    // [hash:8]: hash值取8位
                    // [ext]: 使用之前的文件扩展名
                    // [query]: 添加之前的query参数
                    filename: "static/imgs/[hash:8][ext][query]",
                },
            },
            {
                test: /\.(ttf|woff2?|map4|map3|avi)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/media/[hash:8][ext][query]",
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    // 使用 Babel 预设,这里传递给babel配置选项,当前也可以在外边添加配置参考 babel文档.
                    // options: {
                    //     presets: ['@babel/preset-env'],
                    // },
                },
            },
        ]
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
    },
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            `...`,
            new CssMinimizerPlugin(),
        ],
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
    ]
}