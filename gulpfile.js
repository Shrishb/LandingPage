const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//compile sass and move to css
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

//compile minified dependencies to src path
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'
    , 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});


//fonts folder move
gulp.task('fonts', function(){
    return gulp.src(['node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest("src/fonts"));
});


//fonts css folder move
gulp.task('fa', function(){
    return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
    .pipe(gulp.dest("src/css"));
});

//initialize server
gulp.task('initserver',gulp.series('sass',  function(){
    browserSync.init({
    server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],gulp.series('sass'));
    gulp.watch("src/*.html").on('change',browserSync.reload);
}));


//startup tasks for default set
gulp.task('default', gulp.series( 'js','fa','fonts','initserver'));