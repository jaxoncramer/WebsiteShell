//gulpfile.js - file to control gulp build tools for web development

/* VARIABLES */

var gulp = require('gulp');

//Requires the gulp-sass plugin
var sass = require('gulp-sass');

//Required for browser synchronization
var browserSync = require('browser-sync').create();

//Required for concatenation of JS and CSS files
var useref = require('gulp-useref');

//Required for minifying JS files only
var uglify = require('gulp-uglify');

//Required for combining PostCSS functions
var postcss = require('gulp-postcss');

//Required for minifying CSS files only (PostCSS)
var cssnano = require('cssnano');

//Required for PostCSS autoprefixing
var autoprefixer = require('autoprefixer');

//Required for optimizing images (.png, .jpg, .jpeg, .gif, .svg)
var imagemin = require('gulp-imagemin');

//Required for cache
var cache = require('gulp-cache');

//Required to serialize task execution
var runSequence = require('run-sequence');

//Gulp If statement
var gulpIf = require('gulp-if');

//Deletes array of Node Globs
var del = require('del');

//Parameters for PostCSS
var plugins = [
    autoprefixer({browsers: ['last 6 versions', 'Safari 6', 'Safari 5']}),
    cssnano()
];

/* END VARIABLES */

/* CONCATENATION/MINIFICAION - Create one JS or CSS minified file from many files */
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies JS files with uglify
        .pipe(gulpIf('*.js', uglify()))
        // Minifies CSS files with css-nano and autoprefixes css files for cross browser support
        .pipe(gulpIf('*.css', postcss(plugins)))
        .pipe(gulp.dest('dist'))
});

/* OPTIMIZE IMAGES - optimize images and cache them*/
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg')
        // Cache images that run through imagemin
        .pipe(cache(imagemin({
            // Set interlaced gifs to true
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

/* COPY FONTS - Move fonts from development (app) to production (dist) */
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

/* CLEAN DIST - Delete all files in the 'dist' directory */
gulp.task('clean:dist', function() {
    return del.sync('dist');
});

/* CLEAR CACHE - clear the cache (of all images) */
gulp.task('cache:clear', function(callback) {
    return cache.clearAll(callback)
});

/* BUILD TASK - prepare all files for the production site */
gulp.task('build', function(callback) {
    runSequence('clean:dist', //runs clean:dist first
        ['sass', 'useref', 'images', 'fonts'], //runs the rest of the tasks in parallel once clean finishes
        callback
    )
});

/* BROWSER SYNC - Synchronize watch task with browser viewing */
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app' //"app" folder is the root of the server for browser sync
        },
    })    
});

/* SASS COMPILER - This task will convert all Sass (.scss) files into CSS */
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(postcss(plugins)) // Perform autoprefixing and minification on Sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

/* WATCH TASK - Project-wide watch task that should be run at the beginning of work session
                Watch will run appropriate watch tasks each time a file is saved */
gulp.task('watch', ['browserSync', 'sass'], function() { //watch cannot be run until browserSync and sass is run first
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

/* DEFAULT - run this task with 'gulp', basically a clone of 'gulp watch' */
gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});

