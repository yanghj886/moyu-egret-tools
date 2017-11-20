'use strict'
const gulp = require('gulp')
const staticHash = require('gulp-static-hash')
const path = require('path')
const tinypng = require('gulp-tinypng-compress')
const replace = require('gulp-replace')

module.exports = {
    reshash: function (dest, callback) {
        return gulp.src(path.resolve(dest, 'resource', 'default.res.json'))
            .pipe(staticHash({
                asset: path.resolve(dest, 'resource', 'assets'),
                exts: ['json', 'png', 'jpg', 'fnt']
            }))
            .pipe(gulp.dest(path.resolve(dest, 'resource')))
            .on('end', function () {
                callback && callback()
            })
    },
    version: function (dest, callback) {
        const version = Date.now()
        return gulp.src([path.resolve(dest, '**', '*.thm.json'), path.resolve(dest, 'main.min.js')])
            .pipe(replace('.exml"', '.exml?v=' + version + '"'))
            .pipe(replace('default.res.json"', 'default.res.json?v=' + version + '"'))
            .pipe(replace('default.thm.json"', 'default.thm.json?v=' + version + '"'))
            .pipe(gulp.dest(path.resolve(dest)))
            .on('end', function () {
                callback && callback()
            })
    },
    tinypng: function (key, src, dest, callback) {
        return gulp.src(path.resolve(src, 'resource', 'assets', '**', '*') + '.{png,jpg,jpeg}')
            .pipe(tinypng({
                key: key,
                sigFile: path.resolve(dest, '.tinypng-sigs'),
                log: true
            }))
            .pipe(gulp.dest(path.resolve(dest, 'resource', 'assets')))
            .on('end', function () {
                callback && callback()
            })
    },
    copy: function (src, dest, callback) {
        return gulp.src(path.resolve(src, '**', '*'))
            .pipe(gulp.dest(path.resolve(dest)))
            .on('end', function () {
                callback && callback()
            })
    }
}