const gulp = require('gulp');
const gutil = require('gulp-util');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const livereload = require('gulp-livereload');
const source = require('vinyl-source-stream');

gulp.task('default', ['build']);

const VARS = {
  css: {
    src: 'src/styles/**/*.sass',
    entry: 'src/styles/style.sass',
    dest: './static/'
  },
  img: {
    src: 'src/i/**/*',
    dest: './static/i'
  },
  press: {
    src: './press.json',
    dest: './dist/'
  },
  rivus: {
    src: './rivus.json',
    dest: './dist/'
  },
  js: {
    src: 'src/js/**/*.js',
    entry: 'src/js/index.js',
    dest: './static/',
    bundle: function(options) {
      const props = {
        entries: [VARS.js.entry],
        debug: !!options.sourceMaps,
        cache: {},
        packageCache: {}
      };

      const bundler = options.watch ? watchify(browserify(props)) : browserify(props);
      bundler.transform(babelify, {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread', 'transform-runtime']
      });

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

gulp.task('settings', ['press', 'rivus']);

gulp.task('build', ['js', 'css', 'img', 'settings']);

gulp.task('img', function() {
  return gulp.src(VARS.img.src)
    .pipe(gulp.dest(VARS.img.dest))
});

gulp.task('press', function() {
  return gulp.src(VARS.press.src)
    .pipe(gulp.dest(VARS.press.dest));
});

gulp.task('rivus', function() {
  return gulp.src(VARS.rivus.src)
    .pipe(gulp.dest(VARS.rivus.dest));
});

gulp.task('js', function() {
  return VARS.js.bundle({ sourceMaps: process.env.NODE_ENV !== 'production' })
});

gulp.task('css', function() {
  return gulp.src(VARS.css.entry)
    .pipe(sass({
      compiler: require('node-sass'),
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(VARS.css.dest))
    .pipe(livereload());
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

gulp.task('watch', [
  'watch:js',
  'watch:css',
  'watch:img'
]);

function onJsBundleError() {
  const args = Array.prototype.slice.call(arguments);

  if (typeof args[0] === 'string') {
    args[0] = new Error(args[0]);
  }

  notify.onError({
    title: 'Jared Wray Web: Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end'); // Keep gulp from hanging on this task
}

module.exports = VARS;
