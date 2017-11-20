#!/usr/bin/env node
const runGulpTask = require('run-gulp-task')
const gutil = require('gulp-util')
const tasks = require('./tasks')


const commander = require('commander')
commander
    .description('egret deploy tools')
    .version(require('./package').version)
    .option('-s, --src [value]', 'source path')
    .option('-d, --dest [value]', 'dist path')
    .option('-k, --key [value]', 'tinypng key')
commander.parse(process.argv)


const { src, dest, key } = commander
if (!src || !dest || !key) {
    console.log('-s, --src: %s', 'source path')
    console.log('-d, --dest: %s', 'dist path')
    console.log('-k, --key: %s', 'tinypng key')
    console.log('--help: %s', 'help')
} else {
    gutil.log('Starting', gutil.colors.magenta('copy...'))
    tasks.copy(src, dest, function () {
        gutil.log('Starting', gutil.colors.magenta('tinypng...'))
        tasks.tinypng(key, src, dest, function () {
            gutil.log('Starting', gutil.colors.magenta('reshash...'))
            tasks.reshash(dest, function () {
                gutil.log('Starting', gutil.colors.magenta('version...'))
                tasks.version(dest, function () {
                    gutil.log(gutil.colors.green('Done'))
                })
            })
        })
    })
}



