'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    connect = $.connectMulti,
    wiredep = require('wiredep').stream,
    devServer = connect(),
    proServer = connect();

gulp.task('connect-dev', devServer.server({
    root: ['app'],
    port: 8989,
    livereload: true,
    open: {
        browser: 'Google Chrome'
    }
}));

gulp.task('connect-pro', proServer.server({
    root: ['dist'],
    port: 9090,
    livereload: true,
    open: {
        browser: 'Google Chrome'
    }
}));

gulp.task('clean', function() {
    return gulp.src(['dist'], {read: false})
            .pipe($.rimraf());
});

gulp.task('lint', function() {
    return gulp.src(['app/scripts/*.js', 'app/scripts/**/*.js'])
            .pipe($.jshint('.jshintrc'))
            .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('robots', function() {
    gulp.src('app/robots.txt')
        .pipe(gulp.dest('dist/'));
});

gulp.task('static', function() {
    gulp.src('app/static/*')
        .pipe(gulp.dest('dist/static/'));
});

gulp.task('fonts', function() {
    return gulp.src('app/bower_components/bootstrap/dist/fonts/*')
            .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('base', ['robots', 'static', 'fonts']);

gulp.task('images', function() {
    return gulp.src('app/assets/images/*')
            .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('styles', function() {
    return gulp.src('app/assets/styles/*.css')
            .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('scripts', ['lint'], function() {
    return gulp.src(['app/scripts/app.js'])
            .pipe($.browserify({
                transform: ['reactify'],
                extensions: ['.jsx']
            }))
            .on('prebundle', function(bundler) {
                bundler.require('react');
            })
            .pipe(gulp.dest('dist'))
            .pipe($.size());
});

gulp.task('html', ['base', 'images', 'styles', 'scripts'], function() {
    var assets = $.useref.assets();
    return gulp.src('app/*.html')
            .pipe(assets)
            .pipe(assets.restore())
            .pipe($.useref())
            .pipe(gulp.dest('dist'))
            .pipe($.size());
});

gulp.task('wiredep', function() {
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            ignorePath: 'app/'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('browserify', ['lint'], function() {
    return gulp.src(['app/scripts/app.js'])
            .pipe($.browserify({
                transform: ['reactify'],
                extensions: ['.jsx']
            }))
            .on('prebundle', function(bundler) {
                bundler.require('react');
            })
            .pipe(gulp.dest('app'))
            .pipe($.size())
            .pipe(devServer.reload());
});

gulp.task('watch', ['browserify'], function() {
    gulp.watch([
        'app/*.html',
        'app/assets/styles/*.css',
        'app/assets/images/*',
        'app/scripts/*.js',
        'app/scripts/**/*.js'
    ], function(event) {
        return gulp.src(event.path)
                .pipe(devServer.reload());
    });

    gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], ['browserify']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('development', ['connect-dev'], function() {
    gulp.start('watch');
});

gulp.task('build', ['html'], function() {
    gulp.start('connect-pro');
});

gulp.task('production', ['clean'], function() {
    gulp.start('build');
});