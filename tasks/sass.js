/**
 * SASS
 * -----------------------------------------------------------------------------
 */

import gulp 						from 'gulp';
import folders					from './folders';

import sass 						from 'gulp-sass';
import sassGlob 				from 'gulp-sass-glob';

import csscomb 					from 'gulp-csscomb';
import autoprefixer 		from 'gulp-autoprefixer';
import cleanCSS					from 'gulp-clean-css';
import rename						from 'gulp-rename';

import {reload} from './browserSync';


// Task `sass`
gulp.task('sass', () => gulp
	.src(`${folders.assetsSrc}/sass/**/*.+(sass|scss)`)
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))

		.pipe(csscomb())
		.pipe(autoprefixer({
			browsers: ['last 15 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(gulp.dest(`${folders.assetsBuild}/css`))
);


// Task `sass:watch`
gulp.task('sass:watch', () => {
	gulp.watch(`${folders.assetsSrc}/sass/**/*.+(sass|scss)`, gulp.series('sass', reload));
});
