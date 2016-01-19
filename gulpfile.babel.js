import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import path from 'path';
import webpack from 'webpack';
import changed from 'gulp-changed';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import minifyCss from 'gulp-minify-css';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import assign from 'object-assign';

var argv = require('minimist')(process.argv.slice(2));
var DEBUG = !argv.release;

console.log(DEBUG);
const reload = browserSync.reload;
const webpackConfig = require('./webpack.config.js');
let watch = DEBUG ?true:false;
let started = false;

/**
 * 清理build资源
 */
gulp.task('clean', del.bind(null, ['.tmp', 'build/**/*.*', '!/build/.git']));

/**
 * js bundle
 */
gulp.task('bundle', (cb) => {

  started = false;
  const myConfig = Object.create(webpackConfig);
  myConfig.watch = true;
  var compiler = webpack(myConfig);

  let bundle = (err, stats)=> {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    console.log(stats.toString({
      colors: true,
      hash: true,
      cached: true,
      chunkModules: false,
      cachedAssets: true
    }));

    if (!started) {
      started = true;
      return cb();
    }
  };

  if (watch) {
    compiler.watch(200, bundle);
  } else {
    compiler.run(bundle);
  }
});

/**
 * 启动server
 */
gulp.task('server', function () {

  browserSync({
    logPrefix: 'app',
    notify: false,
    https: false,
    proxy: 'localhost:' + (process.env.PORT || 5000)
  });

  gulp.watch("src/assets/less/**/*.less",["less"]);
  gulp.watch("src/index.html",["html"]);
  gulp.watch("src/assets/img/**/*.*",["img"]);
  gulp.watch("src/assets/fonts/**/*.*",["fonts"]);
  gulp.watch("src/assets/js/**/*.*",["js"]);
  gulp.watch("build/**/*.*").on('change', browserSync.reload);

  process.on('exit', function () {
    browserSync.exit()
  });

});

gulp.task('html', ()=> {
  return gulp.src(['src/index.html'])
    .pipe(changed('build'))
    .pipe(plumber())
    .pipe(gulp.dest('build'))
    .pipe(size({title: 'html'}))
    .pipe(reload({ stream: true }));
});

gulp.task('img', ()=> {
  return gulp.src(['src/assets/img/**/*.*'])
    .pipe(changed('build/img'))
    .pipe(plumber())
    .pipe(gulp.dest('build/img'))
    .pipe(size({title: 'img'}))
    .pipe(reload({ stream: true }));
});

gulp.task('fonts', ()=> {
  return gulp.src(['src/assets/fonts/**/*.*'])
    .pipe(changed('build/fonts'))
    .pipe(plumber())
    .pipe(gulp.dest('build/fonts'))
    .pipe(size({title: 'fonts'}))
    .pipe(reload({ stream: true }));
});

gulp.task('css', ()=> {
  return gulp.src(['src/assets/css/**/*.css'])
    .pipe(changed('build/css'))
    .pipe(plumber())
    .pipe(minifyCss())
    .pipe(gulp.dest('build/css'))
    .pipe(size({title: 'css'}))
    .pipe(reload({ stream: true }));
});

gulp.task('js', ()=> {
  return gulp.src(['src/assets/js/**/*.*'])
    .pipe(changed('build/js'))
    .pipe(plumber())
    .pipe(gulp.dest('build/js'))
    .pipe(size({title: 'js'}))
    .pipe(reload({ stream: true }));
});

//style less
gulp.task('less', function () {

  gulp.src(['src/assets/less/**/*.less'])
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ]
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('build/css'))
    .pipe(size({title:'less'}))
    .pipe(reload({ stream: true }));
});

let src= {};
gulp.task('serve',  (cb)=> {
  src.server = [
    'server/**/*.js'
  ];

  var started = false;
  var cp = require('child_process');

  var server = (function startup() {
    var child = cp.fork('./server.js', {
      env: assign({NODE_ENV: 'development'}, process.env)
    });
    child.once('message', function (message) {
      if (message.match(/^online$/)) {
        if (browserSync) {
          browserSync.reload();
        }
        if (!started) {
          started = true;
          gulp.watch(src.server, function () {
            $.util.log('Restarting development server.');
            server.kill('SIGTERM');
            server = startup();
          });
          cb();
        }
      }
    });
    return child;
  })();

  process.on('exit', function () {
    server.kill('SIGTERM');
  });
});

/** 默认启动*/
gulp.task('default', ['build:dev']);

gulp.task('build:dev', function(callback) {
  return runSequence(
    'clean',
    ['img', 'css','less','fonts','js','html'],
    'bundle',
    'serve',
    'server',
    callback);
});

gulp.task('build', function(callback) {

  return runSequence(
    'clean',
    ['img', 'css','less','fonts','js','html'],
    'bundle',
    callback);
});
