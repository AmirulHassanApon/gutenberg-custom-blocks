const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env', '@babel/preset-react' ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            },
        ],
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        '@wordpress/blocks': [ 'wp', 'blocks' ],
        '@wordpress/i18n': [ 'wp', 'i18n' ],
        '@wordpress/element': [ 'wp', 'element' ],
        '@wordpress/block-editor': [ 'wp', 'blockEditor' ],
        '@wordpress/components': [ 'wp', 'components' ],
    },
};
