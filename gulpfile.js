'use strict';
 
const gulp = require('gulp');
const { series } = require('gulp');
const gulpSass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
//const { watch, series } = require('gulp');
 
gulpSass.compiler = require('node-sass');

// Sources for app specific .js and .scss files.
const jsAppSrc = './src/js/*.js';
const scssAppSrc = './src/sass/*.scss';

// Minified and production ready .js & .css files
const cssSrc = './CSS/';
const jsSrc = './js/';

// Gulp sass
function sass() {

return gulp.src(scssAppSrc)
    .pipe(gulpSass({
        
    }).on('error', gulpSass.logError))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssSrc));

}

function watch() {
    gulp.watch(scssAppSrc, { ignoreInitial: false }, series(sass));
}

exports.watch = watch;