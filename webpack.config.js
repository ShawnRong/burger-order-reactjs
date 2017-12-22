const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//minimize js file
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//autoprefixer
const autoprefixer = require('autoprefixer')

module.exports = {
  context: path.resolve(process.cwd(), "src"),
  entry: {
    app: "./index.js"
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '.',
    port: 1024,
    // compress: true
  },
  watch: true,
  output: {
    publicPath: '/dist',
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            //compress css
            use: [
              { 
                loader: 'css-loader', 
                options: { 
                  minimize: true,
                  url: false,
                  //use css module
                  modules: true,
                  localIdentName: "[name]__[local]___[hash:base64:5]"  
                } 
              },
              { 
                loader: 'postcss-loader', 
                options: {
                  ident: 'postcss', 
                  plugins: () => [autoprefixer]
                }
              },
              { loader: 'sass-loader' },
            ]
        })
      },
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //       fallback: 'style-loader',
      //       use: ['css-loader', 'sass-loader']
      //   }),
      // },
      {
         test: /\.(js|jsx)$/,
         exclude: /(node_modules|bower_components)/,
         use: [
           {
             loader: 'babel-loader',
             options: {
               presets: [['env', {modules: false}]],
             //   plugins: ['transform-class-properties'],
               plugins: ["transform-object-rest-spread"]
             }
            }
         ],
      },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf|svg|jpg|png)$/,
      //   use: [
      //       {
      //         loader: 'file-loader',
      //         options: {
      //           name: 'assets/[name]_[sha512:hash:base64:7].[ext]',
      //           useRelativePath: true
      //         },
      //       }
      //   ]
      // }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true,
    }),
    // new UglifyJsPlugin(),
  ]
}