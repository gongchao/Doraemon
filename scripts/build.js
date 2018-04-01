import R from 'ramda'
import fs, { stat } from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import injection from '../src/utils/injection'
import gulp from 'gulp'
import del from 'del'
import nunjucks from 'gulp-nunjucks'
import rename from 'gulp-rename'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import gutil from 'gulp-util'
import server from 'serve'

const rootPath = path.join(__dirname, '../');

const readConfig = R.compose(yaml.safeLoad, fs.readFileSync)

const configs = readConfig(path.join(rootPath, 'config.yml'))

const paths = {
    root: rootPath,
    src: path.join(rootPath, 'src'),
    public: path.join(rootPath, 'public'),
    theme: path.join(rootPath, 'themes', configs.theme),
    output: path.join(rootPath, configs.output_dir),

    doraemon: path.join(rootPath, 'src/doraemon.js'),
    app: path.join(rootPath, 'themes', configs.theme, 'app.js'),
    appTemplate: path.join(rootPath, 'themes', configs.theme, 'index.nj'),
}

configs.userConfigs = readConfig(path.join(paths.theme, 'config.yml'))

const util = injection(configs)

gulp.task('clean', () => del.sync([paths.output], { force: true }))

gulp.task('theme', () => {
    gulp.src(paths.appTemplate)
        .pipe(nunjucks.compile(
            { ...configs, util }
        ))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest(paths.output))
})

gulp.task('compile', () => {
    webpack(webpackConfig(configs, paths), (err, status) => {
        if (err) {
            throw new gutil.PluginError('webpack', err)
        }
        gutil.log('webpack', status.toString({ colors: true }))
    })

    gulp.src(path.join(paths.public, '**/*'))
        .pipe(gulp.dest(path.join(paths.output)))

    gulp.src(path.join(paths.theme, 'assets/**/*'))
        .pipe(gulp.dest(path.join(paths.output, 'assets')))
})

gulp.task('default', ['clean', 'theme', 'compile'])

if (process.env.NODE_ENV === 'development') {
    server(paths.output, {
        port: 5000,
    })

    gulp.watch([
        path.join(rootPath, 'src/**/*'),
        path.join(rootPath, 'themes/**/*'),
    ], ['theme', 'compile'])
}