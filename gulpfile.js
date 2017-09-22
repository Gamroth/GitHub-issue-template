"use strict";
var gulp = require('gulp');
var sass = require('gulp-sass');
var strip = require('gulp-strip-comments');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uncss = require('gulp-uncss');
var csso = require('gulp-csso');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var psi = require('psi');
var Pageres = require('pageres');
var w3cjs = require('gulp-w3cjs');
var browserSync = require('browser-sync').create();
var rename = require("gulp-rename");
var changed = require('gulp-changed');
var notify = require("gulp-notify");
var size = require('gulp-filesize');


var path = require('path').basename(__dirname);
var info = require('./info.json');
// html
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './public';

    return gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        //        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst))
        .pipe(browserSync.stream())
        .pipe(notify({
            message: 'Html task complete'
        }));
});

// styles
gulp.task('styles', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'expanded'
        }).on('error', swallowError))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream())
        .pipe(notify({
            message: 'Styles task complete'
        }));
});


// Images
gulp.task('images', function() {
    gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'))
        .pipe(browserSync.stream())
        .pipe(notify({
            message: 'Images task complete'
        }));
});

//javascript
gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({
            message: 'Script task complete'
        }));
});

//htaccess copy
// gulp.task('copy-htaccess', function() {
//     var htaccessSrc = './node_modules/apache-server-configs/dist/.htaccess',
//         htaccessDst = './public';

//     return gulp.src(htaccessSrc)
//         .pipe(gulp.dest(htaccessDst))
// });

//serve
// gulp.task('server', ['styles', 'html', 'images', 'scripts', 'copy-htaccess'], function() {
//     browserSync.init({
//         server: "./public"
//     });
//     gulp.watch("./src/sass/**/*.sass", ['styles']);
//     gulp.watch("./src/*.html", ['html']);
//     gulp.watch("./src/img/*", ['images']);
//     gulp.watch("./src/js/*.js", ['scripts']);
// });
gulp.task('server', ['styles', 'html', 'images', 'scripts'], function() {
    browserSync.init({
        server: "./public"
    });
    gulp.watch("./src/sass/**/*.scss", ['styles']);
    gulp.watch("./src/*.html", ['html']);
    // gulp.watch("./src/img/*", ['images']);
    gulp.watch("./src/js/*.js", ['scripts']);
});

gulp.task('default', ['server']);


//Deploy to stage.animativ.pl

// gulp.task('deploy', function() {
//     var conn = ftp.create({
//         host: info.host,
//         user: info.user,
//         password: info.pass,
//         parallel: 10,
//         log: gutil.log
//     });

//     var globs = [
//         'public/**/*',
//     ];

//     return gulp.src(globs, {
//             base: './public',
//             buffer: false
//         })
//         .pipe(notify({
//             message: 'Deploy task complete'
//         }))
//         .pipe(conn.newer('/domains/stage.animativ.pl/public_html/'+path))
//         .pipe(conn.dest('/domains/stage.animativ.pl/public_html/'+path));

// });

//testing

// gulp.task('test-psi-mobile', function() {
//     psi.output('stage.animativ.pl/'+path, {
//         // key: key
//         nokey: 'true',
//         strategy: 'mobile',
//     });
// });

// gulp.task('test-psi-desktop', function() {
//     psi.output('stage.animativ.pl/'+path, {
//         // key: key
//         nokey: 'true',
//         strategy: 'desktop',
//     });
// });

// gulp.task('test-pageres', function() {

//     var pageres = new Pageres({
//             delay: 10
//         })
//         .src('stage.animativ.pl/'+path, ['1280x1024', '1920x1080'])
//         .dest('./pageres-screen/');
//     pageres.run(function(err) {
//         if (err) {
//             throw err;
//         }
//         console.log('done');
//     });
// });

gulp.task('test-w3c', function() {
    return gulp.src("./src/*.html")
        .pipe(w3cjs())
        .pipe(notify({
            message: 'W3C task complete'
        }));
});

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
  }