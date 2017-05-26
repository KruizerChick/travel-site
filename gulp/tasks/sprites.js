var gulp = require('gulp'),
  svgSprite = require('gulp-svg-sprite'),
  rename = require('gulp-rename')
  del = require('del'),
  svg2png = require('gulp-svg2png');

// Set up the configuration for the gulp-svg-sprite package
var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function() {
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
    }
    }
  }
}

// Remove existing sprite folders for a clean start
gulp.task('beginClean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

// Transform the icon images into one sprite SVG file AFTER folders have been cleaned
gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

// Create a PNG copy of the SVG sprite file AFTER its creation
gulp.task('createPngCopy', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

// Copy sprite graphic to images folder AFTER 'createSprite' is run
gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

// Copy temp sprites css files to styles/modules/ folder AFTER 'createSprite' is run
gulp.task('copySpriteCSS', ['createSprite'], function(){
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

// Remove the temporary sprite folder AFTER copy processes have run
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
  return del('./app/temp/sprite');
});

// Kicks off all tasks above
gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy',
                    'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
