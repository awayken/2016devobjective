var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
    var postcss = require('gulp-postcss');
    var cssnano = require('cssnano');
    var stylelint = require('stylelint');
    var reporter = require('postcss-reporter');
    var fontMagician = require('postcss-font-magician');
    var atImport = require('postcss-import');
    var cssnext = require('postcss-cssnext');
    var placeholder = require('postcss-placehold');

    return gulp.src('./src/css/site.css')
        .pipe( postcss([
            atImport(),
            stylelint({
                "rules": {
                    "string-quotes": [ 2, "double" ],
                    "color-hex-case": [ 2, "lower" ],
                    "number-leading-zero": [ 2, "never" ],
                    "number-no-trailing-zeros": [ 2 ],
                    "number-zero-length-no-unit": [ 2 ],
                    "function-comma-space-after": [ 2, "always" ],
                    "function-comma-space-before": [ 2, "never" ],
                    "function-parentheses-space-inside": [ 2, "never" ],
                    "function-space-after": [ 2, "always" ],
                    "function-url-quotes": [ 2, "double" ],
                    "value-list-comma-space-after": [ 2, "always" ],
                    "value-list-comma-space-before": [ 2, "never" ],
                    "declaration-colon-space-after": [ 2, "always" ],
                    "declaration-colon-space-before": [ 2, "never" ],
                    "declaration-block-semicolon-newline-after": [ 2, "always" ],
                    "declaration-block-semicolon-newline-before": [ 2, "never-multi-line" ],
                    "declaration-no-important": [ 2 ],
                    "nesting-block-opening-brace-newline-before": [ 2, "always-multi-line" ],
                    "nesting-block-opening-brace-space-before": [ 2, "always-multi-line" ],
                    "block-closing-brace-newline-after": [ 2, "always" ],
                    "block-closing-brace-newline-before": [ 2, "always" ],
                    "block-no-empty": [ 2 ],
                    "block-opening-brace-newline-after": [ 2, "always" ],
                    "block-opening-brace-space-before": [ 2, "always" ],
                    "selector-combinator-space-after": [ 2, "always" ],
                    "selector-combinator-space-before": [ 2, "always" ],
                    "selector-no-id": [ 2 ],
                    "selector-list-comma-newline-after": [ 2, "always" ],
                    "selector-list-comma-newline-before": [ 2, "never-multi-line" ],
                    "selector-list-comma-space-before": [ 2, "never" ],
                    "rule-nested-empty-line-before": [ 2, "always", {
                        except: [ "first-nested" ]
                    }],
                    "rule-no-duplicate-properties": [ 2 ],
                    "rule-no-single-line": [ 2 ],
                    "rule-non-nested-empty-line-before": [ 2, "always" ],
                    "rule-properties-order": [ 2, "alphabetical" ],
                    "rule-trailing-semicolon": [ 2, "always" ],
                    "root-no-standard-properties": [ 2 ],
                    "media-feature-colon-space-after": [ 2, "always" ],
                    "media-feature-colon-space-before": [ 2, "never" ],
                    "media-feature-range-operator-space-after": [ 2, "always" ],
                    "media-feature-range-operator-space-before": [ 2, "always" ],
                    "media-query-parentheses-space-inside": [ 2, "never" ],
                    "media-query-list-comma-newline-after": [ 2, "never-multi-line" ],
                    "media-query-list-comma-newline-before": [ 2, "never-multi-line" ],
                    "media-query-list-comma-space-after": [ 2, "always" ],
                    "media-query-list-comma-space-before": [ 2, "never" ],
                    "at-rule-empty-line-before": [ 2, "always" ],
                    "comment-empty-line-before": [ 2, "always" ],
                    "comment-space-inside": [ 2, "always" ],
                    "indentation": [ 2, 4 ],
                    "no-eol-whitespace": [ 2 ],
                    "no-missing-eof-newline": [ 2 ],
                    "no-multiple-empty-lines": [ 2 ]
                }
            }),
            reporter({
                clearMessages: true
            }),
            placeholder(),
            cssnext({
                browsers: [
                    'last 2 versions',
                    '> 5%',
                    'ie 8'
                ],
                warnForDuplicates: false
            }),
            fontMagician(),
            cssnano()
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
