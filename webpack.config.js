import path from 'path'

export default (configs, paths) => {

    return {
        mode: 'development',
    
        entry: {
            doraemon: paths.doraemon,
            app: paths.app,
        },
    
        output: {
            path: path.join(paths.output, 'assets/js'),
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },

                {
                    test: /\.nj$/,
                    use: 'nunjucks-loader',
                },
            ],
        },
    }
}