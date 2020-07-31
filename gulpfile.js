const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const del = require('del');

const styles = () => {
  return gulp.src('sass/style.+(scss|sass)')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('build/css/style.css'))
    .pipe(browserSync.stream());
};

const images = () => {
  return gulp.src('img/**')
    .pipe(gulp.dest('build/img'));
};

const fonts = () => {
  return gulp.src('fonts/**')
    .pipe(gulp.dest('build/fonts'));
};

const pages = () => {
  return gulp.src('*.html', {allowEmpty: true})
    .pipe(gulp.dest('build'));
};

const clean = () => {
  return del(['build']);
};

const serve = () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  });

  gulp.watch('sass/**/*.+(scss|sass)', styles);
  gulp.watch('*.html', pages).on('all', () => browserSync.reload());
};

const build = gulp.series(clean, gulp.parallel(pages, images, fonts, styles));

const start = gulp.series(build, serve);

module.exports = {build, start};
