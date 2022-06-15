const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js',
        library: {
            name: 'react-slider',
            type: 'umd'
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     use: 'babel-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    externals: {
        react: 'react'
    }
};
