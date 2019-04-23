var gulp = require('gulp')
  , wait = require('gulp-wait');
  
  var svgSprite = require("gulp-svg-sprites");
var svgSprite = require("gulp-svg-sprites");
 
gulp.task('sprites', function () {
    return gulp.src('assets/svg/*.svg')
        .pipe(svgSprite())
        .pipe(gulp.dest("assets"));
});

gulp.task('sprites', function () {
    return gulp.src('assets/svg/*.svg')
        .pipe(svgSprite({
			common: "svgSprite",
            selector: "icon_%f"
        }))
        .pipe(gulp.dest("assets"));
});


// Load the packages needed
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// Environement variables
var paths = {
  root: './',
  src: {
    sass: './src/sass/**/*.scss',
    js: './src/js/*.js',
    img: '/src/img/*.png'
  },
  dist: {
    css: './dist/css/',
    js: './dist/js/',
    img: './dist/img/'
  }
};


/*
 * CSS task :Less compilation, autoprefixer, minification
 */

gulp.task('css', function () {
  return gulp.src(paths.src.sass) // Where can I find my sass files
  .pipe(wait(500))
    .pipe(sass()) // Compile SASS
    .pipe(autoprefixer('last 2 version')) // Will autoprefix the css
   // .pipe(cleanCSS()) // Minify the CSS
    .pipe(rename({ // Rename the file with suffix
      suffix: ''
    }))

    .pipe(gulp.dest(paths.dist.css)) // Where do I send my CSS files
    .pipe(wait(500))
    .pipe(browserSync.stream()); // Trigger browser sync
});

gulp.task('nominify', function () {
  return gulp.src(paths.src.sass) // Where can I find my sass files
    .pipe(sass()) // Compile SASS
    .pipe(autoprefixer('last 2 version')) // Will autoprefix the css
    .pipe(gulp.dest(paths.dist.css)) // Where do I send my CSS files
    .pipe(browserSync.stream()); // Trigger browser sync
});


/*
 * JS task : minify + uglify
 */

gulp.task('js', function () {
  return gulp.src(paths.src.js) // Where can I find my js files
    .pipe(uglify()) // Will minify the JS
    .pipe(rename({ // Rename the file with suffix
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream()); // Trigger browser sync
});


/*
 * Img task : minify
 */

gulp.task('img', function () {
  var options = {
    verbose: true
  };
  return gulp.src(paths.src.img) // Where can I find my images
    .pipe(imagemin({verbose: true })) // Will minify all images
    .pipe(gulp.dest(paths.dist.img));
//    .pipe(browserSync.stream()); // Trigger browser sync
});


/*
 * Prepare da watches
 */

gulp.task('watch', function () {
  gulp.watch(paths.src.sass, ['css']); // Watching css folders
  gulp.watch(paths.src.js, ['js']); // Watching js folders
  browserSync({ // Start the browsersync server
    server: {
      baseDir: paths.root
    }
  });
  gulp.watch(['*.html', paths.dist.css],reload); // Watching HTML, JS and CSS files for changes
}); 





/*
 * Working test (gulp work in terminal)
 */

gulp.task('work', ['css', 'js', 'watch']);
