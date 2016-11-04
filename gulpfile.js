const gulp = require('gulp');

const eslint = require('gulp-eslint');
const htmlhint = require('gulp-htmlhint');

gulp.task('lint', ['eslint', 'htmlhint']);

gulp.task('eslint', function() {
    return gulp.src(['auth/**/*',
            'authcoordinator/**/*',
            'basedata/**/*',
            'candidate/**/*',
            'circlesBackEnd/**/*',
            'coordinator/**/*',
            'employer/**/*',
            'jobprofile/**/*',
            'professiontoskillsgraphdata/**/*',
            'profiles/**/*',
            'questionbox/**/*',
            'rubricbackend/**/*',
            'sectioneducation/**/*',
            'sectionpersonalinfo/**/*',
            'sectionproject/**/*',
            'sectionskill/**/*',
            'sectionworkexperiance/**/*',
            'skillcard/**/*',
            'verification/**/*',
            'app.js',
            'gulpfile.js',
            '!node_modules/**/*'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('htmlhint', function() {
    return gulp.src(['**/*.html', '!node_modules/**/*'])
        .pipe(htmlhint({
            htmlhintrc: '.htmlhintrc'
        }))
        .pipe(htmlhint.failReporter());
});
