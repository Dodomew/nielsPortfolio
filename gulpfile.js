// Packages
var gulp 	= require('gulp');
var sass 	= require('gulp-sass');
var cssnano = require('gulp-cssnano');
var uglify =  require('gulp-uglify');
var gulpIf =  require('gulp-if');
var svgSprite = require('gulp-svg-sprite');
var concat = require('gulp-concat');
var optionsSass = {
	errLogToConsole: true,
	outputStyle: 'compressed'
};
var browserSync = require('browser-sync').create();
var gulpUtil 	= require('gulp-util');
var plumber     = require('gulp-plumber');


// Sass & Minify
gulp.task('sass', function(){
  return gulp.src('./src/scss/main.scss')
    .pipe(sass(optionsSass).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});


// JS concat
function handleError(err) {
    gulpUtil.log(gulpUtil.colors.red('[Error]'), err.toString());
    this.emit('end');
}

gulp.task('js', function() {
  return gulp.src([
  		// main
		'./src/js/libs/jquery-2.1.4.min.js',
		'./src/js/libs/ScrollToPlugin.min.js',
  		'./src/js/main.js'
  	])

    .pipe(plumber(handleError))
    .pipe(concat('main.min.js'))
	.pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('./js'))
});


// Ensures the `js` task is complete before reloading browsers
gulp.task('js-reload', ['js'], function (done) {
    browserSync.reload();
    done();
});


// Gulp Sprite
gulp.task('svg', function (){
    config = {
        shape: {
            spacing: {
                padding: '1px'
            }
        },
        mode: {
            css: {
                render: {
                    scss: {
                        template: './src/scss/settings/_icon_template.mustache',
                        dest: '../src/scss/settings/_settings.icon.scss'
                    }
                },
                prefix: "icon-",
                dest: "",
                sprite: "icon-sprite.svg"
            }
        }
    };

    gulp.src('./src/img/icons/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('img'))
});



// Watch
gulp.task('watch', function(){

	browserSync.init({

        server: {
            baseDir: "./"
        }
    });

	gulp.watch('./src/scss/**/*.scss', ['sass']);
	gulp.watch('./src/js/**/*.js', ['js-reload']);
})
