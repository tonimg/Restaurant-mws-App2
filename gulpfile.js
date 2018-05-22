// List Tasks:

// serve (serve dev and watch files)
// serve:dist (serve build files)

// lint (lint to js)
// minify-js (js minify)
// autoprefixer (npm install --save-dev gulp-autoprefixer)
// minify-css (css minify)
// minify-html
// minFiles (minify-js, minify-css and minify-html)
// images (creates responsive jpg and png files)
// webp (creates webp files from jpg files)

// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const browserSync = require('browser-sync');
const responsive = require('gulp-responsive');
// const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
// const cleanCSS = require('gulp-clean-css');
const csso = require('gulp-csso');
//
const htmlmin = require('gulp-htmlmin');
// const concat = require('gulp-concat');
const rename = require('gulp-rename');
const jshint = require('gulp-jshint');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

// File where the favicon markups are stored
const reload = browserSync.reload;

// watch files for changes and reload
gulp.task('serve', () => {
  browserSync({
    port: 8000,
    injectChanges: true,
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['*.html', './assets/js/*.js'])
  gulp.watch('./assets/scss/*.scss', ['minify-css'])
  .on('change', reload);
});

// copy files to dist folder and start serve dist
gulp.task('serve:dist', () => {
  browserSync({
    port: 8000,
    server:{
      baseDir:'./dist/'
    }
  });
  //copy data folder to dist folder
  gulp.src(['assets/data/**/*']).pipe(gulp.dest('./dist/assets/data/'));
  //copy images
  gulp.src(['assets/img/*']).pipe(gulp.dest('./dist/assets/img'))
});

//  Minify-js
gulp.task('minify-js', () => {
  gulp.src('./assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js/'));
});

// minify-scss & Autoprefixer
gulp.task('minify-css', () => {
  gulp.src('./assets/scss/*.scss')
    .pipe(reload({stream: true}))
    .pipe(sass({
      outputStyle: 'compressed',
      precision: 10,
      includePaths:['.'],
      onError: console.error.bind(console, 'Sass error: ')
    }))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest('./assets/css/'))
    .pipe(csso())
    .pipe(gulp.dest('./dist/assets/css/'));
});

// minify-html
gulp.task('minify-html', () => {
  gulp.src('*.html')
    .pipe(htmlmin({ 
      collapseWhitespace: true,
      removeComments: true
   }))
    .pipe(gulp.dest('./dist/'));
});

// // Lint Task
// gulp.task('lint', function() {
//   return gulp.src('./assets/js/*.js')
//       .pipe(jshint().on('error', jshint.logError))
//       .pipe(jshint.reporter('default'));
// });

// generate responsive jpg files
gulp.task('images', () => {
  gulp.src(`${src.dev.img}*.{jpg,png}`)
    .pipe(responsive({
      // Resize all JPG images to three different sizes: 300, 400, and 600 pixels
      '*.jpg': [{
        width: 300,
        rename: { suffix: '-s' }
      }, {
        width: 300 * 2,
        rename: { suffix: '-s@2x' }
      }, {
        width: 400,
        rename: { suffix: '-m' }
      }, {
        width: 400 * 2,
        rename: { suffix: '-m@2x' }
      }, {
        width: 600,
        rename: { suffix: '-l' }
      }, {
        // Compress, strip metadata, and rename original image
        rename: { suffix: '-xl' }
      }],
      // '*.png': {
      //   width: '100%'
      // },
      '*': {
        width: '100%'
      }
    }, 
    {
      // Global configuration for all images
      errorOnEnlargement: false,
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 80,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
      max: true
    }))
    .pipe(gulp.dest(src.dev.img));
});