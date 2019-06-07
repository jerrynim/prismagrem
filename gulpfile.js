var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
gulp.task("babel", function() {
  //gulp babel 입력시 실행
  return gulp
    .src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("./", { sourceRoot: "../src" }))
    .pipe(gulp.dest("out")); //out에 저장
});
