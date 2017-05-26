var gulp = require('gulp'),
    modernizr = require('gulp-modernizr');

// Uses the Modernizr package to examine all CSS and JS files in the assets folder and subfolders
gulp.task('modernizr', function() {
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
    .pipe(modernizr({
      'options': [
        'setClasses'
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
});
