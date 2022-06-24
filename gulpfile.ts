const path = require("path");
const gulp = require("gulp");
const merge2 = require("merge2");
const less = require("gulp-less");
const watch = require("gulp-watch");
const cssnano = require("gulp-cssnano");
const ts = require("gulp-typescript");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const notify = require("gulp-notify");
const gulpCopy = require("gulp-copy");

const util = require("util");
const exec = util.promisify(require("child_process").exec);

const outDir = path.resolve(__dirname, "./dist");
const buildDir = path.resolve(__dirname, "./src");
const tsConfig = path.resolve(__dirname, "./tsconfig.json");
const ignoreDir = [`!${buildDir}/node_modules/**/*`, `!${buildDir}/miniprogram_npm/**/*`];

const cleaner = () => exec(`npx rimraf ${outDir}`);

const copier = (dist, ext, msg) => async function copy() {
  const srcPath = [`${buildDir}/**/*.${ext}`, ...ignoreDir];
  return gulp.src(srcPath, { nodir: true }).pipe(gulp.dest(dist));
};
/** 拷贝静态资源 */
const imageCopier = () => gulp.parallel(copier(outDir, "svg", "图片拷贝完成"), copier(outDir, "png", "图片拷贝完成"));
const staticCopier = () => gulp.parallel(
  copier(outDir, "ttml", "ttml拷贝完成"),
  copier(outDir, "sjs", "sjs拷贝完成"),
  copier(outDir, "json", "json拷贝完成"),
  copier(outDir, "js", "js拷贝完成"),
  copier(outDir, "png", "图片拷贝完成"),
  copier(outDir, "jpg", "图片拷贝完成"),
  copier(outDir, "jpeg", "图片拷贝完成"),
  copier(outDir, "svg", "图片拷贝完成"),
);

// 拷贝node_modules、 miniprogram_npm
const copyNodeModules = async () => gulp.src([`${buildDir}/node_modules/**/*`]).pipe(gulp.dest(outDir));
// gulp.src(`${buildDir}/miniprogram_npm/**/*`, { base: "." }).pipe(gulp.dest(outDir));

/** 编译Less */
const lessCompile = async () => gulp.src([`${buildDir}/**/*.less`, `${buildDir}/**/*.css`, ...ignoreDir], { nodir: true }).pipe(less()).pipe(cssnano()).pipe(rename({ extname: ".ttss" }))
  .pipe(gulp.dest(outDir))
  .pipe(notify("Less编译完成"));

const tsCompiler = async () => {
  const tsProject = ts.createProject(tsConfig, {
    declaration: true,
  });
  return gulp.src([`${buildDir}/**/*.ts`, ...ignoreDir], { nodir: true })
    .pipe(tsProject())
    .pipe(gulp.dest(outDir))
    .pipe(notify("Typescript编译完成"));
};
// const tsProject = ts.createProject(tsConfig, {
//   declaration: true,
// });
// const tsResult = tsProject.src().pipe(tsProject());
// return merge2(
//   tsResult.js.pipe(gulp.dest(outDir)).pipe(uglify()).pipe(gulp.dest(outDir)).pipe(notify("Typescript编译完成")),
//   tsResult.dts.pipe(gulp.dest(outDir)),
// );
// ;\

/** 压缩js */
const jsUglify = async () => gulp.src([`${buildDir}/**/*.js`, ...ignoreDir], { nodir: true }).pipe(uglify().on("error", (err) => console.log(err))).pipe(gulp.dest(outDir));

const watcher = () => {
  watch(`${buildDir}/**/*.less`, lessCompile);
  watch(`${buildDir}/**/*.ttml`, copier(outDir, "ttml", "ttml更新完成"));
  watch(`${buildDir}/**/*.sjs`, copier(outDir, "sjs", "sjs更新完成"));
  watch(`${buildDir}/**/*.ts`, tsCompiler);
  watch(`${buildDir}/**/*.js`, jsUglify);
  watch(`${buildDir}/**/*.json`, copier(outDir, "json", "json更新完成"));
  watch(`${buildDir}/**/*.png`, imageCopier);
  watch(`${buildDir}/**/*.svg`, imageCopier);
};

const dev = gulp.series(cleaner, gulp.parallel(tsCompiler, lessCompile, staticCopier(), watcher), copyNodeModules);
const build = gulp.series(cleaner, gulp.parallel(tsCompiler, lessCompile, staticCopier(), copyNodeModules));

module.exports = {
  dev,
  build,
};
