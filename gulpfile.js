'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('default', () => gulp.src('src/**/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('index.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist')));
