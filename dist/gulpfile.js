const gulp=require("gulp"),browserSync=require("browser-sync"),responsive=require("gulp-responsive"),uglify=require("gulp-uglify-es").default,csso=require("gulp-csso"),htmlmin=require("gulp-htmlmin"),rename=require("gulp-rename"),jshint=require("gulp-jshint"),autoprefixer=require("gulp-autoprefixer"),sass=require("gulp-sass"),reload=browserSync.reload;gulp.task("serve",()=>{browserSync({port:8e3,injectChanges:!0,server:{baseDir:"./app"}}),gulp.watch("./app/*.html").on("change",reload),gulp.watch("./app/assets/js/**/*.js").on("change",reload),gulp.watch("./app/assets/scss/**/*.scss").on("change",reload)}),gulp.task("serve:dist",()=>{browserSync({port:8e3,server:{baseDir:"./dist/"}}),gulp.src(["./app/assets/data/**/*"]).pipe(gulp.dest("./dist/assets/data/")),gulp.src(["./app/manifest.json"]).pipe(gulp.dest("./dist/")),gulp.src(["./app/assets/icons/*"]).pipe(gulp.dest("./dist/assets/icons/"))}),gulp.task("minify-js",()=>{gulp.src("./app/assets/js/*.js").pipe(uglify()).pipe(gulp.dest("./dist/assets/js/"))}),gulp.task("minify-SWjs",()=>{gulp.src("./*.js").pipe(uglify()).pipe(gulp.dest("./dist/"))}),gulp.task("minify-css",()=>{gulp.src("./app/assets/scss/*.scss").pipe(reload({stream:!0})).pipe(sass({outputStyle:"compressed",precision:10,includePaths:["."],onError:console.error.bind(console,"Sass error: ")})).pipe(autoprefixer({browsers:["last 2 versions"],cascade:!1})).pipe(gulp.dest("./app/assets/css/")).pipe(csso()).pipe(gulp.dest("./dist/assets/css/"))}),gulp.task("minify-html",()=>{gulp.src("./app/*.html").pipe(htmlmin({collapseWhitespace:!0,removeComments:!0})).pipe(gulp.dest("./dist/"))}),gulp.task("images",()=>{gulp.src("./app/assets/img/*.jpg").pipe(responsive({"*.jpg":[{width:300,rename:{suffix:"-s"}},{width:600,rename:{suffix:"-s@2x"}},{width:400,rename:{suffix:"-m"}},{width:800,rename:{suffix:"-m@2x"}},{width:600,rename:{suffix:"-l"}},{rename:{suffix:"-xl"}}],"*":{width:"100%"}},{errorOnEnlargement:!1,quality:80,progressive:!0,withMetadata:!1,max:!0})).pipe(gulp.dest("./dist/assets/img"))}),gulp.task("minify-files",["minify-js","minify-SWjs","minify-css","minify-html","images"]);