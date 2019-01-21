'use strict';
 
const gulp = require('gulp');
const { series } = require('gulp');
const gulpSass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const prefix = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
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
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(prefix({
        browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 7'],
        cascade: true,
        grid: "autoplace" 
    }))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssSrc));
}

function js_min() {
    return gulp
    .src(jsAppSrc)
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(jsSrc));
}

function watch() {
    gulp.watch(scssAppSrc, { ignoreInitial: false }, series(sass, js_min));
}

exports.watch = watch;