var gulp = require('gulp'),
sass = require('gulp-sass'),
uglify = require('gulp-uglifyjs'),
concat = require('gulp-concat'),
tinypng = require('gulp-tinypng'),
babel = require('gulp-babel'),
fileinclude = require('gulp-file-include'),
browserSync = require('browser-sync'),
reload = browserSync.reload;

gulp.task('fileinclude', function() {
    return gulp.src(['dist/html/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('sass', function () {
    return gulp.src('dist/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css/'));
});

gulp.task('build', function () {
    gulp.src([
        'dist/img/**/*.jpg',
        'dist/img/**/*.png'])
    .pipe(tinypng('WGwr7lCbkzUJMdJBdHRfiqgkcU6XV1YE'))
    .pipe(gulp.dest('app/img/'));
});

gulp.task('scripts', function () {
    return gulp.src([
        'dist/js/*.js'
        ])
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js", "*.html"], {
        server: {
            baseDir: "app"
        }
    });
});

gulp.task('watch', ['sass', 'scripts', 'fileinclude', 'browser-sync'], function () {
    gulp.watch('dist/sass/**/*.scss', ['sass']);
    gulp.watch('dist/js/*.js', ['scripts']);
    gulp.watch('dist/**/*.html', ['fileinclude']);
    gulp.watch(['app/**'], reload);
});


gulp.task('default', ['watch']);