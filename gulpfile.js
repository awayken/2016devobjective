var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./src/css/*.css')
        .pipe( postcss([
            autoprefixer({
                browsers: [
                    'last 2 versions',
                    '> 5%',
                    'ie 8'
                ]
            })
        ]) )
        .pipe( gulp.dest('./dist/styles') )
        .pipe( browserSync.stream() );
});

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe( gulp.dest('./dist') )
        .pipe( browserSync.stream() );
});

gulp.task('serve', [ 'default' ], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('./src/css/**/*.css', [ 'styles' ]);
    gulp.watch('./src/*.html', [ 'html' ]);
});

gulp.task('clean', function( cb ) {
    var del = require('del');

    del(['./dist']).then(function() {
        cb();
    });
});

gulp.task('default', [ 'clean' ], function( cb ) {
    var runSequence = require('run-sequence');

    runSequence( 'styles', 'html', cb );
});
