const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const sass = require('gulp-sass')(require('sass'));
const webp = require('gulp-webp');
const browserSync = require('browser-sync'). create()

const clean= () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
  .pipe(dest('dist'))
}

const convertSass = () => {
  return src('src/styles/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
    .pipe(dest('src/styles'));
};


const styles = () => {
  return src('src/styles/**/*.css')
  .pipe(sourcemaps.init())
  .pipe(concat('main.css'))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCSS({
    level:2
  }))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const htmlMinify = ()=> {
  return src('src/**/*.html')
  .pipe(htmlMin({
    collapseWhitespace:true
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}


const pluginScripts = () => {
  return src('src/js/**/*.min.js')
  .pipe(dest('dist'))
}

const scripts = () => {
  return src(
    'src/js/index.js'
  )
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify({
    toplevel: true
  }).on('error', notify.onError()))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server:{
      baseDir: 'dist'
    }
  })
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/**/*.jpeg',
  ])
  .pipe(image())
  .pipe(dest('dist/images'))
}

const webpConvert = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/**/*.jpeg',
  ])
  .pipe(webp())
  .pipe(dest('dist/images'))
}

const fonts = () => {
  return src('src/fonts/**')
  .pipe(dest('dist/fonts'))
}

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/images/**', images)
watch('src/images/**', webpConvert)
watch('src/js/**/*.min.js', pluginScripts)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)
watch('src/styles/sass/**/*.scss', convertSass)
watch('src/fonts/**',fonts )

exports.clean = clean
exports.styles = styles
exports.htmlMinify = htmlMinify
exports.scripts = scripts
exports.convertSass = convertSass
exports.default = series(clean, resources, htmlMinify,pluginScripts,   scripts, convertSass, styles, images, webpConvert, fonts, watchFiles)



