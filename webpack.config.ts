import path from 'path';
import type { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
    mode: (process.env.NODE_ENV as 'production' | 'development' | undefined) ?? 'development',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: { limit: 8192 },
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
        }),
    ],
};

export default config;
