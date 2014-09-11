'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    connect = $.connectMulti(),
    wiredep = require('wiredep').stream;

gulp.task('connect', connect.server({
    root: ['dist'],
    port: 8989,
    livereload: true,
    open: {
        browser: 'Google Chrome'
    }
}));

gulp.task('html', function() {
    return gulp.src('app/*.html')
            .pipe($.useref())
            .pipe(gulp.dest('dist'));
});

gulp.task('wiredep', function() {
    return gulp.src('app/*.html')
            .pipe(wiredep())
            .pipe(gulp.dest('dist'))
            .pipe($.size())
            .pipe(connect.reload());
});

gulp.task('css', function() {
    return gulp.src('app/assets/styles/*.css')
            .pipe(gulp.dest('dist/assets/styles'))
            .pipe(connect.reload());
});

gulp.task('images', function() {
    return gulp.src('app/assets/images/*')
            .pipe(gulp.dest('dist/assets/images'))
            .pipe(connect.reload());
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/app.js')
            .pipe($.browserify({
                insertGlobals: true,
                transform: ['reactify']
            }))
            .pipe(gulp.dest('dist/scripts'))
            .pipe($.size())
            .pipe(connect.reload());
});

gulp.task('bootstrap', function() {
    return gulp.src('app/bower_components/bootstrap/dist/css/*')
            .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('fonts', function() {
    return gulp.src('app/bower_components/bootstrap/dist/fonts/*')
            .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('bower', function() {
    gulp.src('app/bower_components/**/*', {base: 'app/bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));
});

gulp.task('clean', function() {
    return gulp.src(['dist'], {read: false})
            .pipe($.clean());
});

gulp.task('base', ['css', 'images', 'scripts']);

gulp.task('bundle', ['html', 'bootstrap', 'fonts', 'base'], function() {
    var assets = $.useref.assets();
    return gulp.src('./app/*.html')
            .pipe(assets)
            .pipe(assets.restore())
            .pipe($.useref())
            .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['wiredep', 'bower', 'base'], function() {
    gulp.start('connect');
    gulp.watch('app/*.html', ['wiredep']);
    gulp.watch('app/assets/styles/*.css', ['css']);
    gulp.watch('app/assets/images/*', ['images']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
});

gulp.task('development', ['clean'], function() {
    gulp.start('watch');
});

gulp.task('build', ['bundle'], function() {
    gulp.start('connect');
});

gulp.task('production', ['clean'], function() {
    gulp.start('build');
});
