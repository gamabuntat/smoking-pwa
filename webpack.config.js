const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    return {
        mode: env.production ? 'production' : 'development',
        devtool: env.production ? 'source-map' : 'eval',
        entry: {
            bundle: env.production ? './src/index.prod.tsx' : './src/index.tsx',
            sw: './src/sw.js',
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            alias: {
                '~': path.resolve(__dirname, 'src'),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './static/index.html',
                excludeChunks: '',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: './static/assets',
                        to: '[name][ext]',
                    },
                ],
            }),
        ],
        devServer: {
            client: {
                overlay: false,
            },
        },
    };
};
