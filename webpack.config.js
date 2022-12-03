const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLInlineCSSWebpackPlugin =
    require('html-inline-css-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
                    use: [
                        env.production
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        'css-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            alias: {
                '~': path.resolve(__dirname, 'src'),
            },
        },
        optimization: {
            minimizer: [`...`, new CssMinimizerPlugin()],
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: './static/index.html',
                excludeChunks: '',
            }),
            new HTMLInlineCSSWebpackPlugin(),
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
