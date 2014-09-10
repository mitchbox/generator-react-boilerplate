'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('connect', $.connect.server({
    root: ['dist'],
    port: 8888,
    livereload: true,
    open: {
        browser: 'Google Chrome'
    }
}));

gulp.task('html', function() {
    return gulp.src('app/*.html')
            .pipe($.useref())
            .pipe(gulp.dest('dist'))
            .pipe($.size())
            .pipe($.connect.reload());
});

gulp.task('css', function() {
    return gulp.src('app/assets/styles/*.css')
            .pipe(gulp.dest('dist/assets/styles'))
            .pipe($.connect.reload());
});

gulp.task('images', function() {
    return gulp.src('app/assets/images/*')
            .pipe(gulp.dest('dist/assets/images'))
            .pipe($.connect.reload());
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/app.js')
            .pipe($.browserify({
                insertGlobals: true,
                transform: ['reactify']
            }))
            .pipe(gulp.dest('dist/scripts'))
            .pipe($.size())
            .pipe($.connect.reload());
});

gulp.task('bundle', ['scripts'], function() {
    return gulp.src('./app/*.html')
            .pipe($.useref.assets())
            .pipe($.useref.restore())
            .pipe($.useref())
            .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src(['dist/assets', 'dist/scripts', 'dist/static', 'dist/config'], {read: false})
            .pipe($.clean());
});

gulp.task('bower', function() {
    gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));
});

gulp.task('development', ['html', 'bower', 'bundle', 'connect'], function() {
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/assets/styles/*.css', ['css']);
    gulp.watch('app/assets/images/*', ['images']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
});

gulp.task('production', ['html', 'bundle', 'connect']);
