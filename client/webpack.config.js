import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __dirname = path.resolve()

export default {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: 'public', 
                    to: '.' , 
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                },{
                    from: 'src/App.css', to: '.'
                },
            ]
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    }
}