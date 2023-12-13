// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

/// recorder
const Recorder = require('./scripts/recorder')
const recorder = new Recorder({ path: "./trash/webpackLog" })
let log = false;
let report = true;
/// recorder


const config = {


    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        //filename: "index.bundle.js"
        filename: "[name].js"

    }, devtool: "source-map",
    devServer: {
        port: 8080,
        open: true,
        host: "0.0.0.0",
        // host: 'localhost',
        historyApiFallback: true,
         static: { directory: path.resolve(__dirname, 'dist') },
       
        compress: true,

        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                router: () => 'http://localhost:5050',
                logLevel: 'debug' /*optional*/
            }
        }

    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        new Dotenv(),

        new MiniCssExtractPlugin(),

        isProduction &&
        new BundleAnalyzerPlugin(),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    }
};


module.exports = (webpackEnv) => {

    if (isProduction) {
        config.mode = 'production';


        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

    } else {
        config.mode = 'development';
    }

    return recorder.write(config, { mode: config.mode, report: report, log: log })


};
