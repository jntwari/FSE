const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
   entry: './src/index.js',

    output: {
        path : path.resolve(__dirname,'./dist'),
        filename: 'bundle.js',
    },

    
    devServer: {
        contentBase: './dist',

        proxy: {
            '/api': {
               target: {
                  host: "localhost",
                  protocol: 'http:',
                  port: 5000
               },
               pathRewrite: {
                  '^/api': ''
               }
            }
         }
      
    },
}