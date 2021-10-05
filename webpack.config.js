const currenTask = process.env.npm_lifecycle_event;
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { postcss } = require('autoprefixer');
const fse = require('fs-extra');
let cssConfig = {
    test: /\.css$/i,
    use: ["css-loader", "postcss-loader"]
}
let pages = fse.readdirSync('./app').filter(function (file) {
    return file.endsWith('.html');
}).map(function (page) {
    return new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    })
});
let config = {
    entry: "./app/assets/scripts/App.js",
    plugins: pages, //[new HtmlWebpackPlugin({ filename: 'index.html', template: './app/index.html' })],
    module: {
        rules: [
            cssConfig,
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            }
        ]
    }
}
class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('Copy images', function () {
            fse.copySync("./app/assets/images", "./docs/assets/images")
        });
    }
}
if (currenTask == 'dev') {
    cssConfig.use.unshift('style-loader')
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    }
    config.devServer = {
        onBeforeSetupMiddleware: function (devServer) {
            devServer.app.get('./app/""/*.html', function (req, res) {
                res.json({ custom: "response" });
            });
        },
        static: [path.join(__dirname, 'app')],
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    }
    config.mode = 'development'

}
if (currenTask == 'build') {
    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    //postCSSPlugins.push(require('cssnano'));
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    }
    config.mode = 'production';
    config.optimization = {
        splitChunks: { chunks: 'all' }
    };
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' }),
        new RunAfterCompile()
    )

}
module.exports = config;