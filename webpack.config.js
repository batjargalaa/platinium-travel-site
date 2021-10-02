const path = require('path');
module.exports = {
    entry: "./app/assets/scripts/App.js",
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    devServer: {
        onBeforeSetupMiddleware: function (devServer) {
            devServer.app.get('./app/""/*.html', function (req, res) {
                res.json({ custom: "response" });
            });
        },
        static: [path.join(__dirname, 'app')],
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    }
}