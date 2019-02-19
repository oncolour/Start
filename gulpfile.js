'use strict';
 
const gulp = require('gulp');
const { series } = require('gulp');
const gulpSass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const prefix = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const del = require("del");
 
gulpSass.compiler = require('node-sass');

// Paths for src files and destinations
var paths = {
    styles: {
      src: './src/sass/*.scss',
      dest: './CSS/'
    },
    scripts: {
      src: './src/js/*.js',
      dest: './js/'
    }
  };


//Clean build folders
function clean() {
    return del([paths.styles.dest + "*.css", paths.scripts.dest + "*.js"]).then(paths => {
        console.log('Clearing css & javascript files');
    });
}
exports.clean = clean;

// Gulp sass
function sass() {
    return gulp.src(paths.styles.src)
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(sourcemaps.init())
    .pipe(prefix({
        browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 7'],
        cascade: true,
        grid: "autoplace" 
    }))
    .pipe(cleanCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}

// Javascript min
function js_min() {
    return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
}

// Watch scss and js files
function watch() {
    gulp.watch(paths.styles.src, { ignoreInitial: false }, sass);
    gulp.watch(paths.scripts.src, { ignoreInitial: false }, js_min);
}
exports.watch = watch;


var build = gulp.series(clean, gulp.parallel(sass, js_min));
exports.build = build;

exports.default = build;