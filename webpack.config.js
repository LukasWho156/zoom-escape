import * as path from 'path';
import * as url from 'url';
import webpack from 'webpack';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default (env, argv) => {
    const config = {
        entry: './src/index.js',
        devServer: {
            static: './dist',
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, argv.mode === 'production' ? './dist' : './dev'),
        },
        optimization: {
            minimize: argv.mode === 'production',
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|mp3|wav|ogg|oga|ttf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.ts$/i,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
    }
    return config;
};