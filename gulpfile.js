'use strict'
const gulp = require('gulp')
const argv = require('minimist')(process.argv.slice(2))
const runSequence = require('run-sequence')
const gutil = require('gulp-util')
const tasks = require('./tasks')



const { s, k, d } = argv

const opt = {
    dest: d,
    key: k,
    src: s
}

gulp.task('reshash', function () {
    return tasks.reshash(opt)
})

gulp.task('tinypng', function () {
    return tasks.tinypng(opt)
})

gulp.task('version', function () {
    return tasks.version(opt)
})

gulp.task('exmlversion', function () {
    return tasks.exmlversion(opt)
})

gulp.task('copy', function () {
    gutil.log('src path', gutil.colors.magenta(opt.src))
    gutil.log('dest path', gutil.colors.magenta(opt.dest))
    gutil.log('tinypng key', gutil.colors.magenta(opt.key))
    return tasks.copy(opt)
})



gulp.task('deploy', function (callback) {
    runSequence('copy', 'tinypng', 'reshash', 'version', callback)
})

gulp.task('default', ['deploy'], function () {

})