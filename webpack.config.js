// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
// const ESLintPlugin = require('eslint-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

/// recorder
const Recorder = require('./scripts/recorder')
const recorder = new Recorder({ path: "./trash/webpackLog" })
let log = false;
let report = false;
/// recorder



const config = {

    entry: { bundle: path.resolve(__dirname, './src/index.js') },
    output: {
        path: path.resolve(__dirname, 'PHP/api/gaKneeboard'),

        filename: "[name].js",
        assetModuleFilename: "[name][ext]",
        clean: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/"),
            "@components": path.resolve(__dirname, "src/components/"),
            "@pages": path.resolve(__dirname, "src/App/pages/"),
            "@store": path.resolve(__dirname, "src/Store/"),
            "@translations": path.resolve(__dirname, "src/translations/"),
        }
    },


    devtool: "source-map",
    // devtool: "hidden-source-map", // Ukrywa source-map przed użytkownikami
    devServer: {
        port: 8080,
        open: true,
        host: "0.0.0.0",
        // host: 'localhost',
        historyApiFallback: true,
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /^\/$/, to: 'localhost:8080/api/' },
        //         { from: /./, to: 'localhost:8080/api/' }
        //     ]
        // },
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
        new CopyWebpackPlugin({
            patterns: [
              { from: "public", to: "" }, // Kopiuje zawartość `public/` do `dist/`
            ],
          }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: "gaKneeboard",
            meta: {
                keywords: "TAF,METAR,GAMET,wind triangle, load, NOTAM, database"
            },
            minify: false,
            inject: true
        }),

        new Dotenv(),

        new MiniCssExtractPlugin(),

        // isProduction &&
        // new BundleAnalyzerPlugin(),

        // new ESLintPlugin({fix: true})


        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        
    ],
    module: {
        rules: [
            // {
            // test: /\.js$/,
            // exclude: /node_modules/,
            //     loader: 'eslint-loader',
            //     options: {
            //         fix: true,
            //         emitError: true,
            //         emitWarning: true,
            //         configFile:"eslint"
            //     },
            //   },
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader'
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
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)$/i,
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
