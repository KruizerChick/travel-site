const path = require('path');

module.exports = {
    // Define the base JS file
    entry: "./app/assets/scripts/App.js",
    // Define the bundled JS file and file path
    output: {
        path: path.resolve(__dirname, "./app/temp/scripts"),
        filename: "App.js"
    },
    // Use Babel to convert JS files from ES2015 (excluding any in /node_modules)
    module: {
        rules: [
            {
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}
