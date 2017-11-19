'use strict'
const gulp = require('gulp')
const argv = require('minimist')(process.argv.slice(2))
const runSequence = require('run-sequence')
const gutil = require('gulp-util')
const tasks = require('./tasks')



const { s, k, d } = argv

gulp.task('reshash', function () {
    return tasks.reshash(d)
})

gulp.task('tinypng', function () {
    return tasks.tinypng(k, s, d)
})

gulp.task('copy', function () {
    gutil.log('src path', gutil.colors.magenta(s))
    gutil.log('dest path', gutil.colors.magenta(d))
    gutil.log('tinypng key', gutil.colors.magenta(k))
    return tasks.copy(s, d)
})



gulp.task('deploy', function (callback) {
    runSequence('copy', 'tinypng', 'reshash', callback)
})

gulp.task('default', ['deploy'], function () {

})