"use strict";

import webpack from 'webpack';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

//let extractCss = new ExtractTextPlugin('css/[name].css');

let plugins = [
    //new webpack.ProvidePlugin({_: 'underscore'}),
    //new webpack.optimize.UglifyJsPlugin(),
    //extractCss
    new HtmlWebpackPlugin({
        template: `./index.html`
    })
];

const src = `${__dirname}/src`;

module.exports = {
    entry: {
        app: './src/js/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.hbs$/,
                loader: "handlebars"
            },
            {
                test: /\.html$/,
                loader: "html?interpolate"
            },
            {
                test: /fonts\/.*?\.(woff|woff2|eot|ttf|svg)\??(.*?)$/,
                loader: 'url-loader?limit=256&name=/fonts/[name].[ext]'
            },
            {
                test: /^(?!.*fonts)\/.*?\.(jpg|jpeg|gif|png|svg)$/,
                loader: 'url-loader?limit=256&name=/img/[name].[ext]'
            },
            {
                test: /\.(scss|css)/,
                loader: 'style!css!sass!postcss'
            }
        ]
    },
    htmlLoader: {
        //ignoreCustomFragments: [/\{\{.*?}}/],
        root: path.resolve(__dirname),
        attrs: ['img:src'],
        xhtml: true,
        interpolate: true
    },
    watchOptions: {
        ignored: /node_modules|bower_components/
    },
    devtool: 'source-map',
    plugins,
    resolve: {
        alias: {
            templates: `${src}/templates`,
            js: `${src}/js`,
            css: `${src}/css`
        }
    }
};

