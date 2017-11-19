'use strict'
const gulp = require('gulp')
const staticHash = require('gulp-static-hash')
const path = require('path')
const tinypng = require('gulp-tinypng-compress')

module.exports = {
    reshash: function (dest) {
        return gulp.src(path.resolve(dest, 'resource', 'default.res.json'))
            .pipe(staticHash({
                asset: path.resolve(dest, 'resource', 'assets'),
                exts: ['json', 'png', 'jpg', 'fnt']
            }))
            .pipe(gulp.dest(path.resolve(dest, 'resource')))
    },
    tinypng: function (key, src, dest) {
        return gulp.src(path.resolve(src, 'resource', 'assets', '**', '*') + '.{png,jpg,jpeg}')
            .pipe(tinypng({
                key: key,
                sigFile: path.resolve(dest, '.tinypng-sigs'),
                log: true
            }))
            .pipe(gulp.dest(path.resolve(dest, 'resource', 'assets')))
    },
    copy: function (src, dest) {
        return gulp.src(path.resolve(src, '**', '*'))
            .pipe(gulp.dest(path.resolve(dest)))
    }
}