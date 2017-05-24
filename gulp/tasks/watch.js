// Import packages
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

// Configure what tasks to perform upon specific triggers
gulp.task('watch', function(){
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app",
            browser: "google chrome"
        }
    })
    // Watch index.html
    watch('./app/index.html', function(){
        // Refresh the browser whenever the index.html file is changed
        browserSync.reload();
    });
    // Watch all CSS files in the styles folder and subfolders
    watch('./app/assets/styles/**/*.css', function(){
        // Run the 'styles' task upon changes
        gulp.start('cssInject');
    });

    // Watch all JS files in the styles folder and subfolders
    watch('./app/assets/scripts/**/*.js', function(){
        // Run the 'styles' task upon changes
        gulp.start('scriptsRefresh');
    });
});

// Injects CSS changes without refreshing the browser
gulp.task('cssInject', ['styles'],function(){
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

// Refreshes page upon
gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
})
