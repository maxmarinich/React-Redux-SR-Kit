const gulp = require('gulp');
const sass = require('gulp-sass');
const gutil = require('gulp-util');
const watchify = require('watchify');
const babelify = require('babelify');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const uglifyify = require('uglifyify');
const eslintify  = require('eslintify');
const browserify = require('browserify');
const imagemin = require('gulp-imagemin');
const source = require('vinyl-source-stream');
const autoprefixer = require('gulp-autoprefixer');


const production = process.env.NODE_ENV === 'production';

const VARS = {
  views: {
    src: 'source/views/**/*.pug',
    dest: './server/views'
  },
  css: {
    src: 'source/assets/styles/**/*.sass',
    entry: 'source/assets/styles/style.sass',
    dest: './static'
  },
  img: {
    src: 'source/assets/i/**/*',
    dest: './static/i'
  },
  js: {
    src: 'source/assets/js/**/*.js',
    entry: 'source/assets/js/index.js',
    dest: './static',
    bundle: function(options) {
      const props = {
        entries: [VARS.js.entry],
        debug: !!options.sourceMaps,
        cache: {},
        packageCache: {}
      };

      const bundler = options.watch ? watchify(browserify(props)) : browserify(props);
      bundler.transform(eslintify);
      bundler.transform(babelify, {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread', 'transform-runtime']
      });

      if (production) { bundler.transform({global: true}, uglifyify) }

      function rebundle() {
        return bundler.bundle()
          .on('error', onJsBundleError)
          .pipe(source('index.js'))
          .pipe(gulp.dest(VARS.js.dest))
      }

      bundler.on('update', function() {
        gutil.log('Rebundling UI javascript...');
        rebundle();
      });

      return rebundle();
    }
  }
};

gulp.task('default', ['build']);

gulp.task('build', ['js', 'css', 'img', 'views']);

gulp.task('watch', [ 'watch:js', 'watch:css', 'watch:img' ]);

gulp.task('views', function() {
  if (production) {
    return gulp.src(VARS.views.src).pipe(gulp.dest(VARS.views.dest))
  }
});

gulp.task('img', function() {
  return gulp.src(VARS.img.src)
    .pipe(imagemin())
    .pipe(gulp.dest(VARS.img.dest))
});

gulp.task('js', function() {
  return VARS.js.bundle({ sourceMaps: !production });
});

gulp.task('css', function() {
  return gulp.src(VARS.css.entry)
    .pipe(sass({
      compiler: require('node-sass'),
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./static'))
});

gulp.task('watch:css', ['css'], function() {
  gulp.watch(VARS.css.src, ['css']);
});

gulp.task('watch:js', function() {
  return VARS.js.bundle({ watch: true, sourceMaps: process.env.NODE_ENV !== 'production' });
});

gulp.task('watch:img', ['img'], function() {
  gulp.watch(VARS.img.src, ['img']);
});

function onJsBundleError() {
  const args = Array.prototype.slice.call(arguments);

  if (typeof args[0] === 'string') { args[0] = new Error(args[0]) }
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end'); // Keep gulp from hanging on this task
}

module.exports = VARS;
