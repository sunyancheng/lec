const path = require("path");
const gulp = require("gulp");

const DIR = {
  less: path.resolve(__dirname, "./src/**/*.less"),
  img: path.resolve(__dirname, "./src/**/images/*.png"),
  audio: path.resolve(__dirname, "./src/**/assets/sounds/*.mp3"),
  lib: path.resolve(__dirname, "./lib"),
  es: path.resolve(__dirname, "./es"),
  d: path.resolve(__dirname, "./src/**/*.d.ts"),
};

gulp.task("copyLess", async () => {
  gulp.src(DIR.less).pipe(gulp.dest(DIR.lib)).pipe(gulp.dest(DIR.es));
});

gulp.task("copyImg", async () => {
  gulp.src(DIR.img).pipe(gulp.dest(DIR.lib)).pipe(gulp.dest(DIR.es));
});

gulp.task("copyAudio", async () => {
  gulp.src(DIR.audio).pipe(gulp.dest(DIR.lib)).pipe(gulp.dest(DIR.es));
});

gulp.task("copyD", async () => {
  gulp.src(DIR.d).pipe(gulp.dest(DIR.lib)).pipe(gulp.dest(DIR.es));
});

gulp.task(
  "default",
  gulp.series([
    "copyLess",
    "copyImg",
    "copyAudio",
    "copyD",
    async (done) => done,
  ])
);
